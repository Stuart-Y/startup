const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

let fills = []

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.get('/fills', (_req, res) => {
  res.send(fills);
});

apiRouter.post('/fills', (req, res) => {
  fills = updateFills(req.body, fills);
  res.send(fills);
});

function updateFills(newFill, fills) {
  fills.push(newFill)
  
  if (fills.length > 10) {
    fills.length = 10;
  }
  
  return fills;
}

secureApiRouter.get('/customs', async (_req, res) => {
  /*const user = users[req.query.user];
    const items = userItems[user];
    if (items) {
      res.send({items: items});
      return;
    }
    res.send({items: {}})*/
  const userItems = await DB.getItems();
  res.send(userItems);  
});

secureApiRouter.post('/custom', async (req,res) => {
  /*const user = users[req.body.user];
      const item = req.body.item
      const items = userItems[user] || [];
      const pos = items.findIndex((x) => x === item);
      if(pos !== -1) {
        pos = items.find((x) => x === item)
        items[pos] = item;
      } else {
      items.push(item)
      }
      userItems[user] = items
      console.log(userItems)*/
      const userItems = await DB.getItems();
      if(userItems.find(item => item.name === req.body.name) ){
        pos = userItems.findIndex(item => item.name === req.body.name)
        await DB.removeItemByName(userItems[pos].name)
      }
      await DB.addItem(req.body)
      const sendItems = await DB.getItems(); 
      res.send(sendItems)
  });

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
