import React, { useState, useEffect } from 'react';
import './fill.css';
import { VolumeFill, ItemFill } from './fillMath';
import { testFill, testContainer } from './tempTables';

export function Fill(props) {
  const [fillItems, setFillItems] = useState([]);
  const [containerItems, setContainerItems] = useState([]);
  const [selectedFiller, setSelectedFiller] = useState('');
  const [selectedContainer, setSelectedContainer] = useState('');
  const [selectedFillType, setSelectedFillType] = useState('volume');
  const [calculatedResult, setCalculatedResult] = useState('');
  const [storedItems, setItems] = useState([]);

  React.useEffect(() => {
    fetch('/api/customs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // This will fail if the server returns HTML
      })
      .then((data) => {
        setItems(data);  // Set the items data
  
        // Filter fillers and containers from the fetched data
        const fillers = data.filter((item) => item.type === 'filler');
        const containers = data.filter((item) => item.type === 'container');
  
        // Merge with the test data
        setFillItems([...testFill, ...fillers]);
        setContainerItems([...testContainer, ...containers]);
      })
      .catch((error) => {
        console.error('Error fetching customs data:', error);
      });
  }, []);  // Empty dependency array, so this effect runs only once on component mount

  async function saveItem(item) {

    const newItem = { item: {...item}, user: props.userName }

    await fetch('/api/custom', {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(newItem),
    })
    .catch();
  }

  async function sendFill() {
    const fill = {
      item: selectedFiller,
      number: calculatedResult,
      container: selectedContainer,
      user: props.userName,
    };
    await fetch('/api/fills', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(fill),
    })
  }

  // Dropdown state management for selected values
  const handleFillerChange = (event) => {
    const selected = event.target.value
    setSelectedFiller(selected);
    console.log("Selected Filler:", selected);
  };

  const handleContainerChange = (event) => {
    const selected = event.target.value
    setSelectedContainer(selected);
    console.log("Selected Container:", selected);
  };

  const handleFillTypeChange = (event) => {
    setSelectedFillType(event.target.value);
  };

  const handleCalculate = () => {
    if (!selectedFiller || !selectedContainer) {
      setCalculatedResult("Please fill in all fields");
      return;
    }

    const fill = JSON.parse(selectedFiller)
    const container = JSON.parse(selectedContainer)

    let result = '';
    if (selectedFillType === 'volume') {
      result = VolumeFill(fill.volume, container.volume);
    } else if (selectedFillType === 'shape') {
      result = ItemFill(fill.volume, fill.shape, container.volume, container.shape);
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

    saveItem(updatedFillItems[fillerIndex]);
    saveItem(updatedContainerItems[containerIndex]);

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
