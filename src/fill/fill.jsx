import React, { useState, useEffect } from 'react';
import './fill.css';
import { VolumeFill, ItemFill } from './fillMath';
import { testFill, testContainer } from './tempTables';

export function Fill() {
  const [fillItems, setFillItems] = useState([]);
  const [containerItems, setContainerItems] = useState([]);
  const [selectedFiller, setSelectedFiller] = useState('');
  const [selectedContainer, setSelectedContainer] = useState('');
  const [selectedFillType, setSelectedFillType] = useState('volume');
  const [calculatedResult, setCalculatedResult] = useState('');

  // Dropdown state management for selected values
  const handleFillerChange = (value) => {
    setSelectedFiller(value);
    console.log("Selected Filler:", value);
  };

  const handleContainerChange = (value) => {
    setSelectedContainer(value);
    console.log("Selected Container:", value);
  };

  const handleFillTypeChange = (event) => {
    setSelectedFillType(event.target.value);
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const fillers = storedItems.filter(item => item.type === 'filler');
    const containers = storedItems.filter(item => item.type === 'container');
    setFillItems([...testFill, ...fillers]);
    console.log(fillItems);
    setContainerItems([...testContainer, ...containers]);
    console.log(containerItems);
  }, []);

  const handleCalculate = () => {
    if (!selectedFiller || !selectedContainer) {
      setCalculatedResult("Please fill in all fields");
      return;
    }

    let result = '';
    if (selectedFillType === 'volume') {
      result = VolumeFill(selectedFiller.volume, selectedContainer.volume);
    } else if (selectedFillType === 'shape') {
      result = ItemFill(selectedFiller.volume, selectedFiller.shape, selectedContainer.volume, selectedContainer.shape);
    }

    const updatedFillItems = [...fillItems];
    const updatedContainerItems = [...containerItems];

    const fillerIndex = updatedFillItems.findIndex(item => item.id === selectedFiller.id);
    if (fillerIndex !== -1) {
      updatedFillItems[fillerIndex].used = (updatedFillItems[fillerIndex].used || 0) + 1;
    }

    const containerIndex = updatedContainerItems.findIndex(item => item.id === selectedContainer.id);
    if (containerIndex !== -1) {
      updatedContainerItems[containerIndex].used = (updatedContainerItems[containerIndex].used || 0) + 1;
    }

    setFillItems(updatedFillItems);
    setContainerItems(updatedContainerItems);

    const allItems = [...updatedFillItems, ...updatedContainerItems];
    localStorage.setItem('items', JSON.stringify(allItems));

    setCalculatedResult(result);
  };

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className='fillContent'>
        <div id='fillTitle'>
          <h1>Fill X with Y</h1>
        </div>
        <div id="StuffPicker" className="activityBox">
          <div id="fillPicker"className='chooseItem'>
            <h2>How many</h2>
            <img alt="Question Mark" src="QuestionMark.png" className='QMark'></img>
            <select onChange={handleFillerChange} value={selectedFiller}>
              <option value="" disabled>Select Filler Item</option>
              {fillItems.map((item) => (
                <option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div id="stuffedPicker" className="chooseItem">
            <h2>Can fit in</h2>
            <img alt="Question Mark" src="QuestionMark.png" className='QMark'></img>
            <select onChange={handleContainerChange} value={selectedContainer}>
              <option value="" disabled>Select Container </option>
              {containerItems.map((item) => (
                <option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id="answerbox" className="factbox">
          <h2>Answer: {calculatedResult}</h2>
        </div>
        <div id="fillSettings" className="optionBox">
          <h3>Packing Type</h3>
          <fieldset id="packingType" className="mathPicker">
            <div className="packRad">
              <input
                type="radio"
                id="volume"
                name="fillType"
                value="volume"
                onChange={handleFillTypeChange}
                checked={selectedFillType === 'volume'}
              />
              <label htmlFor="volume">Volume</label><br />
            </div>
            <div className="packRad">
              <input
                type="radio"
                id="shapeFill"
                name="fillType"
                value="shape"
                onChange={handleFillTypeChange}
                checked={selectedFillType === 'shape'}
              />
              <label htmlFor="shapeFill">Shape Packing</label><br />
            </div>
          </fieldset>
        </div>
        <div id="calculateButton">
          <button onClick={handleCalculate} id="submit"className="btn btn-primary">Calculate</button>
        </div>
      </div>
    </main>
  );
}

export default Fill;
