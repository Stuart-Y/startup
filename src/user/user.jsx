import React from 'react';
import './user.css'

export function User(props) {
  const [items, getItems] = React.useState([]);
  const [favoriteItem, setFavoriteItem] = React.useState(null);
  const [joke, setJoke] = React.useState("Loading joke...");

  React.useEffect(() => {
    const itemsJson = localStorage.getItem('items');
    if (itemsJson) {
      const itemsArray = JSON.parse(itemsJson);
      getItems(itemsArray);

      const highestUsedItem = itemsArray.reduce((prev, current) => {
        return (prev.used > current.used) ? prev : current;
      }, {});

      setFavoriteItem(highestUsedItem);
    }
  }, []);

  React.useEffect(() => {
    setJoke("What hppens to a Gungan in a sandstorm... Jar Jar Blinks")
  }, []);

  /*useEffect(() => {
    const socket = new WebSocket('wss://your-websocket-url');

    socket.onmessage = (event) => {
      const newJoke = event.data; 
      setJoke(newJoke);
    };

    return () => {
      socket.close();
    };
  }, []);*/

  const itemRows = [];
  if (items.length) {
    for (const [i, item] of items.entries()) {
      itemRows.push(
        <tr key={i}>
          <td>{item.name}</td>
          <td>{item.volume}</td>
          <td>{item.shape}</td>
        </tr>
      );
    }
  } else {
    itemRows.push(
      <tr key='0'>
        <td colSpan='3'>
          Hey,
          <a className='nav-link' to='custom'>
            Add
          </a>
          some items you'd like to use
        </td>
      </tr>
    );
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="userMain">
        <div id="name">
          <h1>{props.userName}</h1>
        </div>
        <div id="favorite" className="content">
          <h3>Favorite Item</h3>
          {/* Check if favoriteItem is set */}
          {favoriteItem ? (
            <div>
              <img alt="Favorite Item Picture(will be done in js)" src="QuestionMark.png" />
              <p>
                {favoriteItem.name} <br />
                Weight: {favoriteItem.weight || 'N/A'} <br />
                Volume: {favoriteItem.volume} <br />
                Shape: {favoriteItem.shape}
              </p>
            </div>
          ) : (
            <p>No favorite item found.</p>
          )}
        </div>
        <div id="UserCustomItems" className="content">
        <h3>Custom Items</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Volume</th>
                <th>Shape</th>
              </tr>
            </thead>
            <tbody>
              {itemRows}
            </tbody>
          </table>
        </div>                 
        <div id="LatestFills" className="content">
          <h3>Latest</h3>
          <table>
            <tr>
              <th>Item</th>
              <th>Number</th>
              <th>Container</th>
              <th>User</th>
            </tr>
            <tr>
              <td>Koala</td>
              <td>10^8</td>
              <td>Skyscraper</td>
              <td>Bob</td>
            </tr>
            <tr>
              <td>Marble</td>
              <td>5774</td>
              <td>Vacuum Cleaner</td>
              <td>Bob</td>
            </tr>
          </table>
          <p><em>10^8 koalas fit in the empire state building (UserBob)</em></p>    
        </div>
        <div id="JokeBox" class="content">
          <h3>Dad Jokes</h3>
          <p>
            {joke}
          </p>
        </div>
      </div>
    </main>
  );
}