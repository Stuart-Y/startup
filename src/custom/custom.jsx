import React from 'react';
import ItemForm  from './itemForm';
import './custom.css'

export function Custom() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="CustomMain" className="content">
        <h1>Custom</h1>
        <div id="CustomItemOptions">
          <ItemForm/>
        </div>  
      </div>
    </main>
  );
}