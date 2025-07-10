import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';

function WorkAssignmentTable({ onSubmit }) {
  const [rows, setRows] = useState([{ work: '', operative: '' }]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { work: '', operative: '' }]);
  };

  const handleSubmit = () => {
    const cleaned = rows.filter(row => row.work && row.operative);
    if (cleaned.length === 0) {
      alert("❌ Please fill in at least one row.");
      return;
    }
    onSubmit(cleaned);
  };

  return (
    <Box sx={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '10px' }}>
      <Typography variant="h6" gutterBottom>Assign Works to Operatives</Typography>

      {rows.map((row, index) => (
        <Stack direction="row" spacing={2} key={index} sx={{ marginBottom: '1rem' }}>
          <TextField
            label="Work"
            value={row.work}
            onChange={(e) => handleChange(index, 'work', e.target.value)}
            fullWidth
          />
          <TextField
            label="Operative"
            value={row.operative}
            onChange={(e) => handleChange(index, 'operative', e.target.value)}
            fullWidth
          />
        </Stack>
      ))}

      <Button variant="outlined" color="primary" onClick={handleAddRow} sx={{ mb: 2 }}>
        ➕ Add Row
      </Button>

      <div>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          ✅ Submit
        </Button>
      </div>
    </Box>
  );
}

export default WorkAssignmentTable;
