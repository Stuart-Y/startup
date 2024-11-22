import React from 'react';

export function Custom() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="CustomMain" class="content">
        <h1>Custom</h1>
        <h3>Make Your Own Thing</h3>
        <div id="CustomItemOptions" class="optionBox">
          <fieldset>
            <input type="radio" id="container" name="itemType" value="container"/>
            <label for="html">Container</label><br/>
            <input type="radio" id="filler" name="itemType" value="filler"/>
            <label for="css">Filler</label><br/>      
            <input type="text" className='fancyBox' placeholder="item name"/>
            <input type="number" className='fancyBox' placeholder="size/volume"/>
            <select name="itemShape" id="shape">
              <option value="sphere">Sphere</option>
              <option value="cube">Cube</option>
            </select>
          </fieldset>
        </div>  
      </div>
    </main>
  );
}