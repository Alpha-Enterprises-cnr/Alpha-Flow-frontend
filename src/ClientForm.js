import React, { useState } from 'react';
import axios from 'axios';

function ClientForm({ onBack }) {
  const [rows, setRows] = useState([
    {
      slNo: '',
      particulars: '',
      size: '',
      quantity: '',
      unit: ''
    }
  ]);

  const [formHeader, setFormHeader] = useState({
    type: 'C', // default or fetched
    requestNum: 'REQ-001',
    requestedBy: 'John Doe',
    workNum: 'W-1234',
    workSlNo: '1',
    natureOfWork: 'Excavation',
    siteName: 'Site Alpha'
  });

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        slNo: '',
        particulars: '',
        size: '',
        quantity: '',
        unit: ''
      }
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formHeader,
      items: rows
    };

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

      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
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
                {idx === 0 && (
                  <>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.type} readOnly />
                    </td>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.requestNum} readOnly />
                    </td>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.requestedBy} readOnly />
                    </td>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.workNum} readOnly />
                    </td>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.workSlNo} readOnly />
                    </td>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.natureOfWork} readOnly />
                    </td>
                    <td rowSpan={rows.length}>
                      <input type="text" value={formHeader.siteName} readOnly />
                    </td>
                  </>
                )}

                <td>
                  <input
                    type="text"
                    name="slNo"
                    value={row.slNo}
                    onChange={(e) => handleRowChange(idx, 'slNo', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="particulars"
                    value={row.particulars}
                    onChange={(e) => handleRowChange(idx, 'particulars', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="size"
                    value={row.size}
                    onChange={(e) => handleRowChange(idx, 'size', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="quantity"
                    value={row.quantity}
                    onChange={(e) => handleRowChange(idx, 'quantity', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="unit"
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
