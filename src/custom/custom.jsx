import React from 'react';
import ItemForm  from './itemForm';
import './custom.css'

export function Custom(props) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="CustomMain" className="content">
        <h1>Custom</h1>
        <div id="CustomItemOptions">
          <ItemForm userName={props.userName}/>
        </div>  
      </div>
    </main>
  );
}