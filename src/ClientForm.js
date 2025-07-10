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
    <div>
      <h2>Client Material Request Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="type" placeholder="TYPE (C/M/EV)" onChange={handleChange} required />
        <input name="requestNum" placeholder="REQUEST NUM" onChange={handleChange} required />
        <input name="requestedBy" placeholder="REQUESTED BY" onChange={handleChange} required />
        <input name="workNum" placeholder="WORK NUMBER" onChange={handleChange} required />
        <input name="workSlNo" placeholder="WORK Sl.NO" onChange={handleChange} required />
        <input name="natureOfWork" placeholder="NATURE OF WORK" onChange={handleChange} required />
        <input name="siteName" placeholder="SITE NAME" onChange={handleChange} required />
        <input name="slNo" placeholder="SL.NO" onChange={handleChange} required />
        <input name="particulars" placeholder="PARTICULARS" onChange={handleChange} required />
        <input name="size" placeholder="SIZE" onChange={handleChange} required />
        <input name="quantity" placeholder="QUANTITY" onChange={handleChange} required />
        <input name="unit" placeholder="UNIT" onChange={handleChange} required />

        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
}

export default ClientForm;
