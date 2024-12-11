import React from 'react';
import './user.css'
import { Updates } from './updates';

export function User(props) {
  const [itemArray, setItems] = React.useState([]);
  const [favoriteItem, setFavoriteItem] = React.useState(null);
  const [joke, setJoke] = React.useState("Loading joke...");
  const [latestFills, setLatestFills] = React.useState([]);

  React.useEffect(() => {
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then((response) => response.json())
    .then((data) => {
      setJoke(data.setup + ' ' + data.punchline);
    })
    .catch();
  }, []);

  React.useEffect(() => {
    setItems([]);
    fetch('/api/customs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })   
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // This will fail if the server returns HTML
      })
      .then((data) => {
        setItems(data);
  
        const highestUsedItem = data.reduce((prev, current) => {
          return (prev.used > current.used) ? prev : current;
        }, {});
  
        setFavoriteItem(highestUsedItem);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
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
  if (typeof itemArray !== 'undefined'){
  if (itemArray.length) {
    for (const [i, item] of itemArray.entries()) {
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