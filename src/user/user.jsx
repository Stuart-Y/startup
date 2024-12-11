import React from 'react';
import './user.css'
import { Updates } from './updates';

export function User(props) {
  const [items, getItems, setItems] = React.useState([]);
  const [favoriteItem, setFavoriteItem] = React.useState(null);
  const [joke, setJoke] = React.useState("Loading joke...");
  const [latestFills, setLatestFills] = React.useState([]);

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
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then((response) => response.json())
    .then((data) => {
      setJoke(data.setup + data.punchline);
    })
    .catch();
  }, []);

  React.useEffect(() => {
    fetch('/api/custom/req')
      .then((response) => response.json())
      .then((items) => {
        setItems(items);
      })
      .catch();
  }, []);

  /*React.useEffect(() => {
    const socket = new WebSocket('wss://your-websocket-url');

    socket.onmessage = (event) => {
      const newFill = JSON.parse(event.data);

      setLatestFills((prevFills) => {
        const updatedFills = [newFill, ...prevFills];
        return updatedFills.slice(0, 10);
      });
    };

    return () => {
      socket.close();
    };
  }, []);*/

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
              <img alt="Favorite Item Picture(User Image hosting not available)" src="QuestionMark.png" />
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
          <h3>Latest Fills</h3>
          <Updates userName={props.userName}/>
        </div>
        <div id="JokeBox" className="content">
          <h3>Dad Jokes</h3>
          <p>
            {joke}
          </p>
        </div>
      </div>
    </main>
  );
}