import React, { useState } from 'react';
import './fill.css';

import { VolumeFill, ItemFill } from './fillMath'
import { testFill, testContainer } from './tempTables';
import DynamicDropdown from './dynamicDropdown'



export function Fill() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className='fillContent'>
        <div id='fillTitle'>
          <h1>Fill X with Y</h1>
        </div>
        <div id ="StuffPicker" className="activityBox">
          <div id="fillPicker" className="chooseItem">
            <h2> How many </h2>
            <img alt="Question Mark" src="QuestionMark.png" className='QMark'></img>
            <DynamicDropdown menuItems={testFill} />
          </div>
          <div id="stuffedPicker" className="chooseItem">
            <h2>Can fit in</h2>
            <img alt="Question Mark" src="QuestionMark.png" className='QMark'></img>
            <DynamicDropdown menuItems={testContainer}/>
          </div>
        </div>
        <div id="answerbox" className="factbox">
          <h2>Answer:__</h2>
        </div>
        <div id="fillSettings" className="optionBox">
          <h3>Packing Type</h3>
          <fieldset id="packingType" className="mathPicker">
            <div className="packRad">
              <input type="radio" id="volume" name="fillType" value="container"></input>
              <label htmlFor="html">Volume</label><br></br>
            </div>
            <div className="packRad">
              <input type="radio" id="shapeFill" name="fillType" value="container"></input>
              <label htmlFor="html">Shape Packing</label><br></br>
            </div>
          </fieldset>
          </div>
      </div>
    </main>
  );
}