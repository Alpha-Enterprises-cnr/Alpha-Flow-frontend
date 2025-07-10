import React, { useState } from 'react';
import { TextField, Typography, Button, Stack, MenuItem } from '@mui/material';

function JobRegistry({ onSubmit, onBack }) {
  const [name, setName] = useState('');
  const [sitename, setSiteName] = useState('');
  const [natureofwork, setNatureOfWork] = useState('');
  const [priority, setPriority] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      sitename,
      natureofwork,
      priority,
      remarks,
      approved: false, // default
      worknumber: '', // to be assigned later in Master Correspondence
      status: 'Registered - waiting for survey supporting documents',
    });

    // Clear form
    setName('');
    setSiteName('');
    setNatureOfWork('');
    setPriority('');
    setRemarks('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Job Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Filled by"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            select
          >
            <MenuItem value="KEVIN">KEVIN</MenuItem>
            <MenuItem value="PRASANTH">PRASANTH</MenuItem>
          </TextField>

          <TextField
            label="Site Name"
            variant="outlined"
            value={sitename}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />

          <TextField
            label="Nature of Work"
            variant="outlined"
            value={natureofwork}
            onChange={(e) => setNatureOfWork(e.target.value)}
            required
          />

          <TextField
            label="Priority"
            variant="outlined"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            select
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          <TextField
            label="Remarks"
            variant="outlined"
            multiline
            minRows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default JobRegistry;
