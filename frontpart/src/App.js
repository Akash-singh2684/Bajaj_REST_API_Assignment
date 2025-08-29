import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const values = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedOptions(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = JSON.parse(jsonInput);

      if (!Array.isArray(data.data)) {
        throw new Error('Invalid input structure: "data" must be an array');
      }

      // Call your backend API
      const response = await axios.post('https://bajaj-rest-api-assignment.onrender.com', data);
      setResponse(response.data);
    } catch (err) {
      setError('Invalid JSON input: ' + err.message);
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    // Default: show full response
    let displayedData = response;

    // If user applies filters, show only selected keys
    if (selectedOptions.length > 0) {
      displayedData = {};
      if (selectedOptions.includes('Alphabets')) {
        displayedData.alphabets = response.alphabets;
      }
      if (selectedOptions.includes('Odd Numbers')) {
        displayedData.odd_numbers = response.odd_numbers;
      }
      if (selectedOptions.includes('Even Numbers')) {
        displayedData.even_numbers = response.even_numbers;
      }
      if (selectedOptions.includes('Special Characters')) {
        displayedData.special_characters = response.special_characters;
      }
      if (selectedOptions.includes('Sum')) {
        displayedData.sum = response.sum;
      }
      if (selectedOptions.includes('Concatenated String')) {
        displayedData.concat_string = response.concat_string;
      }
    }

    return (
      <div className="response-box">
        <h3>API Response:</h3>
        <pre>{JSON.stringify(displayedData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>JSON Input Processor</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>API Input</label>
          <textarea
            value={jsonInput}
            onChange={handleChange}
            placeholder='{"data":["a","1","334","4","R","$"]}'
            required
            className="json-input"
          />
        </div>
        <button type='submit' className="submit-btn">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>

      {response && (
        <div className="filter-section">
          <label>Filter (optional)</label>
          <select multiple onChange={handleSelectChange} className="multi-select">
            <option value='Alphabets'>Alphabets</option>
            <option value='Odd Numbers'>Odd Numbers</option>
            <option value='Even Numbers'>Even Numbers</option>
            <option value='Special Characters'>Special Characters</option>
            <option value='Sum'>Sum</option>
            <option value='Concatenated String'>Concatenated String</option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
};

export default App;
