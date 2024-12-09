import React from 'react';
import './user.css'

export function User(props) {
  const [items, getItems] = React.useState([]);

  React.useEffect(() => {
    const itemsJson = localStorage.getItem('items');
    if (itemsJson) {
      getItems(JSON.parse(itemsJson))
    }
  }, []);

  const itemRows = [];
  if (items.length) {
    for (const [i, item] of items.entries()) {
      itemRows.push(
        <tr key={i}>
          <td>{item.name}</td>
          <td>{item.density}</td>
          <td>{item.volume}</td>
          <td>{item.shape}</td>
        </tr>
      );
    }
  } else {
    itemRows.push(
      <tr key='0'>
        <td colSpan='4'>
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
          <image alt="Favorite Item Picture(will be done in js)" src="QuestionMark.png"/>
            <p>[undefined] <br/>Weight: null <br/>Volume: null <br/>Shape: null</p>
        </div>
        <div id="UserCustomItems" className="content">
          <h3>Custom Items</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Volume</th>
              <th>Shape</th>
            </tr>
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
            I've Got a pretty good joke about butter but I don't want you spreading it around
          </p>
        </div>
      </div>
    </main>
  );
}