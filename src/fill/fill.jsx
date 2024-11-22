import React from 'react';
import './fill.css';

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
            <select className="itemPicker"></select>
          </div>
          <div id="stuffedPicker" className="chooseItem">
            <h2>Can fit in</h2>
            <img alt="Question Mark" src="QuestionMark.png" className='QMark'></img>
            <select className="itemPicker"></select>
          </div>
        </div>
        <div id="answerbox" class="factbox">
          <h2>Answer:__</h2>
        </div>
        <div id="fillSettings" class="optionBox">
          <h3>Packing Type</h3>
          <fieldset id="packingType" class="mathPicker">
            <div class="packRad">
              <input type="radio" id="volume" name="fillType" value="container"></input>
              <label for="html">Volume</label><br></br>
            </div>
            <div class="packRad">
              <input type="radio" id="shapeFill" name="fillType" value="container"></input>
              <label for="html">Shape Packing</label><br></br>
            </div>
          </fieldset>
          </div>
      </div>
    </main>
  );
}