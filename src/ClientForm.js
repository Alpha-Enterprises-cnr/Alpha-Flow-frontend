import React, { useState } from 'react';
import axios from 'axios';

function ClientForm({ onBack }) {
  const [formData, setFormData] = useState({
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
    unit: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/submit-form', formData);
      alert('✅ Submitted and written to Excel successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit form.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Client Material Request Form</h2>

      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <form onSubmit={handleSubmit}>
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', minWidth: '1200px' }}>
            <thead style={{ background: '#f0f0f0' }}>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(formData).map((key) => (
                  <td key={key}>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        minWidth: '150px',
                        padding: '6px',
                        boxSizing: 'border-box',
                      }}
                      required
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit">✅ Submit</button>{' '}
            <button type="button" onClick={onBack}>⬅️ Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
