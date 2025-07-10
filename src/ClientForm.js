import React, { useState } from 'react';
import axios from 'axios';

function ClientForm({ onBack }) {
  const [rows, setRows] = useState([
    {
      type: '',
      requestNum: '',
      requestedBy: '',
      workNum: '',
      workSlNo: '',
      natureOfWork: '',
      siteName: '',
      slNo: '',
      particulars: '',
      size: '',
      quantity: '',
      unit: ''
    }
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        type: '',
        requestNum: '',
        requestedBy: '',
        workNum: '',
        workSlNo: '',
        natureOfWork: '',
        siteName: '',
        slNo: '',
        particulars: '',
        size: '',
        quantity: '',
        unit: ''
      }
    ]);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/submit-form', { rows });
      alert('✅ Submitted!');
    } catch (err) {
      console.error(err);
      alert('❌ Submission failed');
    }
  };

  const fieldStyle = {
    width: '160px',
    padding: '6px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Client Material Request Form</h2>

      <div
        style={{
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          border: '1px solid #ccc',
          paddingBottom: '0.5rem'
        }}
      >
        <form onSubmit={handleSubmit}>
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', minWidth: '1800px' }}>
            <thead style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              <tr>
                <th>TYPE</th>
                <th>REQUEST NUM</th>
                <th>REQUESTED BY</th>
                <th>WORK NUMBER</th>
                <th>WORK SL.NO</th>
                <th>NATURE OF WORK</th>
                <th>SITE NAME</th>
                <th>SL.NO</th>
                <th>PARTICULARS</th>
                <th>SIZE</th>
                <th>QUANTITY</th>
                <th>UNIT</th>
                <th>🗑️</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {Object.keys(row).map((field) => (
                    <td key={field}>
                      <input
                        type="text"
                        name={field}
                        value={row[field]}
                        onChange={(e) => handleChange(idx, field, e.target.value)}
                        style={fieldStyle}
                        required
                      />
                    </td>
                  ))}
                  <td>
                    {rows.length > 1 && (
                      <button type="button" onClick={() => removeRow(idx)}>❌</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem' }}>
            <button type="button" onClick={addRow}>➕ Add Row</button>{' '}
            <button type="submit">✅ Submit</button>{' '}
            <button type="button" onClick={onBack}>⬅ Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
