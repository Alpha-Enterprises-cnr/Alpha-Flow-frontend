import React, { useState } from 'react';
import axios from 'axios';

function ClientForm({ onBack }) {
  const [header] = useState({
    type: 'C',
    requestNum: 'REQ-001',
    requestedBy: 'John Doe',
    workNum: 'W-1234',
    workSlNo: '1',
    natureOfWork: 'Excavation',
    siteName: 'Site Alpha',
  });

  const [rows, setRows] = useState([
    { slNo: '', particulars: '', size: '', quantity: '', unit: '' },
  ]);

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
    const payload = { ...header, materials: rows };

    try {
      await axios.post('http://localhost:5000/api/submit-form', payload);
      alert('✅ Form submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Submission failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Client Material Request Form</h2>

      {/* Header Fields (non-editable) */}
      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td><strong>TYPE</strong></td>
            <td><input value={header.type} readOnly /></td>
            <td><strong>REQUEST NUM</strong></td>
            <td><input value={header.requestNum} readOnly /></td>
            <td><strong>REQUESTED BY</strong></td>
            <td><input value={header.requestedBy} readOnly /></td>
          </tr>
          <tr>
            <td><strong>WORK NUMBER</strong></td>
            <td><input value={header.workNum} readOnly /></td>
            <td><strong>WORK SL.NO</strong></td>
            <td><input value={header.workSlNo} readOnly /></td>
            <td><strong>SITE NAME</strong></td>
            <td><input value={header.siteName} readOnly /></td>
          </tr>
          <tr>
            <td><strong>NATURE OF WORK</strong></td>
            <td colSpan="5">
              <input value={header.natureOfWork} readOnly style={{ width: '100%' }} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Editable Table Rows */}
      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
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
                <td><input value={row.slNo} onChange={(e) => handleRowChange(idx, 'slNo', e.target.value)} required /></td>
                <td><input value={row.particulars} onChange={(e) => handleRowChange(idx, 'particulars', e.target.value)} required /></td>
                <td><input value={row.size} onChange={(e) => handleRowChange(idx, 'size', e.target.value)} required /></td>
                <td><input value={row.quantity} onChange={(e) => handleRowChange(idx, 'quantity', e.target.value)} required /></td>
                <td><input value={row.unit} onChange={(e) => handleRowChange(idx, 'unit', e.target.value)} required /></td>
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
          <button type="button" onClick={onBack}>⬅️ Back</button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
