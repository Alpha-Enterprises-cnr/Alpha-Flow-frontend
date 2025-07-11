import React, { useState } from 'react';

function ClientForm({ onBack, onSubmit }) {
  const [header, setHeader] = useState({
    requestedBy: '',
    workNumber: '',
    natureOfWork: '',
    siteName: '',
    type: '',
  });

  const [materialRows, setMaterialRows] = useState([
    { workSlNo: '', particulars: '', size: '', qty: '', units: '' },
  ]);

  const [vehicleRow, setVehicleRow] = useState({
    requiredDate: '',
    requiredFrom: '',
    requiredTo: '',
    requiredItem: '',
  });

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...materialRows];
    updatedRows[index][name] = value;
    setMaterialRows(updatedRows);
  };

  const addMaterialRow = () => {
    setMaterialRows((prev) => [
      ...prev,
      { workSlNo: '', particulars: '', size: '', qty: '', units: '' },
    ]);
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...header,
      items: header.type === 'vehicle' ? [vehicleRow] : materialRows,
    };


    if (onSubmit) {
      onSubmit(payload); // Pass to App.js -> logisticsData
    }

    alert('✅ Submitted to Logistics!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', overflowX: 'auto' }}>
      <h2>Client Material Request Form</h2>

      {/* Header Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {['requestedBy', 'workNumber', 'natureOfWork', 'siteName'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={header[field]}
            onChange={handleHeaderChange}
            required
          />
        ))}
      </div>

      {/* Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Type: </label>
        <select name="type" value={header.type} onChange={handleHeaderChange} required>
          <option value="">-- Select --</option>
          <option value="materials">Materials</option>
          <option value="consumables">Consumables</option>
          <option value="vehicle">Vehicle</option>
        </select>
      </div>

      {/* Conditional Rows */}
      {['materials', 'consumables'].includes(header.type) && (
        <>
          <table border="1" cellPadding="8" style={{ width: '100%', minWidth: '800px', marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th>Work Sl.No</th>
                <th>Particulars</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {materialRows.map((row, idx) => (
                <tr key={idx}>
                  {['workSlNo', 'particulars', 'size', 'qty', 'units'].map((col) => (
                    <td key={col}>
                      <input
                        type="text"
                        name={col}
                        value={row[col]}
                        onChange={(e) => handleMaterialChange(idx, e)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" onClick={addMaterialRow}>➕ Add Row</button>
        </>
      )}

      {header.type === 'vehicle' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="date"
            name="requiredDate"
            value={vehicleRow.requiredDate}
            onChange={handleVehicleChange}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="time"
              name="requiredFrom"
              value={vehicleRow.requiredFrom}
              onChange={handleVehicleChange}
            />
            <input
              type="time"
              name="requiredTo"
              value={vehicleRow.requiredTo}
              onChange={handleVehicleChange}
            />
          </div>
          <input
            type="text"
            name="requiredItem"
            placeholder="Required Item"
            value={vehicleRow.requiredItem}
            onChange={handleVehicleChange}
          />
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button type="submit">✅ Submit</button>
        <button type="button" onClick={onBack} style={{ marginLeft: '1rem' }}>⬅️ Back</button>
      </div>
    </form>
  );
}

export default ClientForm;
