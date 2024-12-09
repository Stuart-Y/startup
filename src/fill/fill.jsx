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

    setCalculatedResult(result);
  };

  // Nested DynamicDropdown component
  const DynamicDropdown = ({ menuItems, optionText, onChange }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
      const value = JSON.parse(event.target.value);
      setSelectedValue(value);
      onChange(value);
    };

    return (
      <div>
      <select onChange={handleChange} value={selectedValue}>
        <option value="" disabled>{optionText}</option>
        {menuItems.map((item) => (
          <option key={item.id} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
      </div>
    );
  };

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className='fillContent'>
        <div id='fillTitle'>
          <h1>Fill X with Y</h1>
        </div>
        <div id="StuffPicker" className="activityBox">
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
