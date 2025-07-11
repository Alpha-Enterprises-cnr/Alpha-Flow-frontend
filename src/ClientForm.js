import React, { useState } from 'react';
import axios from 'axios';

function ClientForm({ onBack }) {
  const [basicInfo, setBasicInfo] = useState({
    requestedBy: '',
    workNumber: '',
    natureOfWork: '',
    siteName: '',
  });

  const [type, setType] = useState('');
  const [materialRow, setMaterialRow] = useState({
    workSlNo: '',
    particulars: '',
    size: '',
    quantity: '',
    unit: '',
  });

  const [vehicleRow, setVehicleRow] = useState({
    requiredDate: '',
    requiredTimeFrom: '',
    requiredTimeTo: '',
    requiredItem: '',
  });

  const handleBasicChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleMaterialChange = (e) => {
    setMaterialRow({ ...materialRow, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (e) => {
    setVehicleRow({ ...vehicleRow, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...basicInfo,
      type,
      details: type === 'vehicle' ? vehicleRow : materialRow,
    };

    try {
      await axios.post('http://localhost:5000/api/submit-form', finalData);
      alert('✅ Form submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting form.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Client Form</h2>

      <form onSubmit={handleSubmit}>
        {/* 🔵 Basic Info Row */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            borderBottom: '1px solid #ccc',
          }}
        >
          {['requestedBy', 'workNumber', 'natureOfWork', 'siteName'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              value={basicInfo[field]}
              onChange={handleBasicChange}
              required
              style={{ minWidth: '200px' }}
            />
          ))}
        </div>

        {/* 🔵 Type Dropdown */}
        <div style={{ marginTop: '1rem' }}>
          <label><strong>Type:</strong>{' '}</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="materials">Materials</option>
            <option value="consumables">Consumables</option>
            <option value="vehicle">Vehicle</option>
          </select>
        </div>

        {/* 🔵 Materials or Consumables */}
        {(type === 'materials' || type === 'consumables') && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              overflowX: 'auto',
            }}
          >
            {['workSlNo', 'particulars', 'size', 'quantity', 'unit'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={materialRow[field]}
                onChange={handleMaterialChange}
                required
                style={{ minWidth: '200px' }}
              />
            ))}
          </div>
        )}

        {/* 🔵 Vehicle */}
        {type === 'vehicle' && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              overflowX: 'auto',
            }}
          >
            <input
              type="date"
              name="requiredDate"
              value={vehicleRow.requiredDate}
              onChange={handleVehicleChange}
              required
            />
            <input
              type="time"
              name="requiredTimeFrom"
              value={vehicleRow.requiredTimeFrom}
              onChange={handleVehicleChange}
              required
            />
            <input
              type="time"
              name="requiredTimeTo"
              value={vehicleRow.requiredTimeTo}
              onChange={handleVehicleChange}
              required
            />
            <input
              name="requiredItem"
              placeholder="Required Item"
              value={vehicleRow.requiredItem}
              onChange={handleVehicleChange}
              required
              style={{ minWidth: '200px' }}
            />
          </div>
        )}

        {/* 🔵 Buttons */}
        <div style={{ marginTop: '1.5rem' }}>
          <button type="submit">✅ Submit</button>{' '}
          <button type="button" onClick={onBack}>⬅️ Back</button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
