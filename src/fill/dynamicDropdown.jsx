import React, { useState } from 'react';

function DynamicDropdown({ menuItems, optionText }) {

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedValue}>
        <option value="" disabled>{optionText}</option>
        {menuItems.map((item) => (
          <option key={item.id} value={item.id} className="dropItem">
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DynamicDropdown;
