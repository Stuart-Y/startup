const express = require('express');
const uuid = require('uuid');
const app = express();

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let userItems = [];
let fills = []

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    console.log(user)
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
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

apiRouter.get('/customs', async (_req, res) => {
  /*const user = users[req.query.user];
    const items = userItems[user];
    if (items) {
      res.send({items: items});
      return;
    }
    res.send({items: {}})*/
  console.log(userItems)
  res.send(userItems);  
});

apiRouter.post('/custom', (req,res) => {
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
      console.log(req.body)
      console.log(userItems)
      userItems.push(req.body)
      console.log(userItems)
      res.send(userItems)
  });

function updateItems(newItem, userItems){
  userItems.push(newItem)
  console.log(userItems)
  return userItems
}  

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});