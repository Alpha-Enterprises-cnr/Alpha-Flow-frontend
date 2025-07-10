import React, { useState } from 'react';
import axios from 'axios';

function ClientForm({ onBack }) {
  const [rows, setRows] = useState([
    { slNo: '', particulars: '', size: '', quantity: '', unit: '' }
  ]);

  const [formHeader] = useState({
    type: 'C',
    requestNum: 'REQ-001',
    requestedBy: 'John Doe',
    workNum: 'W-1234',
    workSlNo: '1',
    natureOfWork: 'Excavation',
    siteName: 'Site Alpha',
  });

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { slNo: '', particulars: '', size: '', quantity: '', unit: '' }]);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formHeader, items: rows };

    try {
      await axios.post('http://localhost:5000/api/submit-form', payload);
      alert('✅ Submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit form.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Client Material Request Form</h2>

      {/* Show uneditable form headers */}
      <div style={{ marginBottom: '1rem' }}>
        <strong>TYPE:</strong> {formHeader.type} &nbsp; | &nbsp;
        <strong>REQUEST NUM:</strong> {formHeader.requestNum} &nbsp; | &nbsp;
        <strong>REQUESTED BY:</strong> {formHeader.requestedBy} <br />
        <strong>WORK NUMBER:</strong> {formHeader.workNum} &nbsp; | &nbsp;
        <strong>WORK SL.NO:</strong> {formHeader.workSlNo} &nbsp; | &nbsp;
        <strong>NATURE OF WORK:</strong> {formHeader.natureOfWork} &nbsp; | &nbsp;
        <strong>SITE NAME:</strong> {formHeader.siteName}
      </div>

      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#eee', fontWeight: 'bold' }}>
            <tr>
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
                <td>
                  <input
                    type="text"
                    value={row.slNo}
                    onChange={(e) => handleRowChange(idx, 'slNo', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.particulars}
                    onChange={(e) => handleRowChange(idx, 'particulars', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.size}
                    onChange={(e) => handleRowChange(idx, 'size', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.quantity}
                    onChange={(e) => handleRowChange(idx, 'quantity', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.unit}
                    onChange={(e) => handleRowChange(idx, 'unit', e.target.value)}
                    required
                  />
                </td>
                <td>
                  {rows.length > 1 && (
                    <button type="button" onClick={() => removeRow(idx)}>
                      ❌
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={addRow}>➕ Add Row</button>{' '}
          <button type="submit">✅ Submit</button>{' '}
          <button type="button" onClick={onBack}>⬅️ Back</button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
