import React, { useState } from 'react';
import './itemForm.css'

  function ItemForm(props) {
    const initialFormData = {
      type: '',
      name: '',
      volume: '',
      shape: '',
    };

    const [formData, setFormData] = useState(initialFormData);

  const fieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  
  /*async function saveItem(event) {
    event.preventDefault();
    console.log('Form data before saving:', formData);
    updateCustomItemsLocal(formData);
    setFormData(initialFormData);
  }*/

    async function saveItem(event) {
  
      const newItem = {
        type: formData.type,
        name: formData.name,
        volume: formData.volume,
        shape: formData.shape,
        used: 0 };  
      await fetch('/api/custom', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      //setFormData(initialFormData);      
    }

  /*function updateCustomItemsLocal(newItem) {
    let items = [];
    const itemsJson = localStorage.getItem('items');
    if (itemsJson) {
      items = JSON.parse(itemsJson)
    }
    items.push(newItem)
    localStorage.setItem('items', JSON.stringify(items))
  }*/

  return (
    <form onSubmit={saveItem} className='customForm'>
      <fieldset>
        <label>
          <input 
            type="radio" 
            name="type"
            value="container" 
            checked={formData.type === 'container'}
            onChange={fieldChange}
          />
            Container
        </label>
        <br/>
        <label>
          <input 
            type="radio" 
            name="type"
            value="filler" 
            checked={formData.type === 'filler'}
            onChange={fieldChange}
          />
            Filler
        </label>
        <div className='customInputs'>
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="nameBox"
            name="name"
            value={formData.name}
            onChange={fieldChange}
            required
          />
        </div>    
        <div className='customInputs'>
          <label htmlFor="volume">Volume (m^3):</label>
          <input
            type="number"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={fieldChange}
            required
          />
        </div>
        <div className='customInputs'>
          <label htmlFor="shape">Shape:</label>
          <select
            id="shape"
            name="shape"
            value={formData.shape}
            onChange={fieldChange}
            required
          >
            <option value="">Select a shape</option>
            <option value="sphere">Sphere</option>
            <option value="cube">Cube</option>
            <option value="fluid">Fluid</option>
          </select>
        </div>
        <button type="submit" className="btn btn-secondary" id="submit">
          Create
        </button>
      </fieldset>
    </form>
  );
};

export default ItemForm;
