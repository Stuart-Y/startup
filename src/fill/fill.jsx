import React, { useState, useEffect } from 'react';
import './fill.css';

import { VolumeFill, ItemFill } from './fillMath'
import { testFill, testContainer } from './tempTables';
import DynamicDropdown from './dynamicDropdown'



export function Fill() {
  const [fillItems, setFillItems] = useState([]);
  const [containerItems, setContainerItems] = useState([]);

  const [selectedFiller, setSelectedFiller] = useState('');
  const [selectedContainer, setSelectedContainer] = useState('');
  const [selectedFillType, setSelectedFillType] = useState('volume');
  const [calculatedResult, setCalculatedResult] = useState('');  

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const fillers = storedItems.filter(item => item.type === 'filler');
    const containers = storedItems.filter(item => item.type === 'container');

    setFillItems([...testFill, ...fillers]);
    setContainerItems([...testContainer, ...containers]);
  }, []);  

  const handleFillerChange = (event) => {
    setSelectedFiller(event.target.value);
  };

  const handleContainerChange = (event) => {
    setSelectedContainer(event.target.value);
  };

  const handleFillTypeChange = (event) => {
    setSelectedFillType(event.target.value);
  };

  const handleCalculate = () => {
    if (!selectedFiller || !selectedContainer) {
      setCalculatedResult("Please fill in all fields");
      return;
    }

    const fillerItem = fillItems.find(item => item.id === parseInt(selectedFiller));
    const containerItem = containerItems.find(item => item.id === parseInt(selectedContainer));

    let result = '';
    if (fillerItem && containerItem) {
      if (selectedFillType === 'volume') {
        result = VolumeFill(fillerItem, containerItem);
      } else if (selectedFillType === 'shape') {
        result = ItemFill(fillerItem, containerItem);
      }
    } else {
      result = "Error in selecting the items.";
    }

    setCalculatedResult(result);
  };

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
            <DynamicDropdown 
              menuItems={fillItems} 
              optionText="Select Filler Item" 
              onChange={handleFillerChange} 
            />
          </div>
          <div id="stuffedPicker" className="chooseItem">
            <h2>Can fit in</h2>
            <img alt="Question Mark" src="QuestionMark.png" className='QMark'></img>
            <DynamicDropdown 
              menuItems={containerItems} 
              optionText="Select Container"
              onChange={handleContainerChange}
            />
          </div>
        </div>
        <div id="answerbox" className="factbox">
          <h2>Answer: {calculatedResult}</h2>
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
          <div id="calculateButton">
            <button onClick={handleCalculate}>Calculate</button>
        </div>
      </div>
    </main>
  );
}