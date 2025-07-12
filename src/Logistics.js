import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Button, Typography
} from '@mui/material';

function Logistics({ data = [], onBack }) {
  const [rows, setRows] = useState(
    data.map((entry) => ({
      ...entry,
      altQty: '',
      altUnit: '',
      plannedFrom: '',
      plannedTo: '',
      modeOfTransport: '',
      costPrice: '',
      cpTransport: '',
      remark: '',
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleSave = () => {
    console.log('📦 Final Logistics:', rows);
    alert('✅ Saved (view console for now)');
  };

  return (
    <div style={{ padding: '2rem', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>🚚 Logistics Tracker</Typography>

      <Table>
        <TableHead>
          <TableRow>
            {[
              'Requested By', 'Work No.', 'Nature of Work', 'Site Name',
              'Sl.No', 'Particulars', 'Size', 'Qty', 'Unit',
              'Alt.Qty', 'Alt.Unit', 'Planned From', 'To',
              'Mode of Transport', 'Cost Price', 'CP + Transport', 'Remark'
            ].map((label, idx) => (
              <TableCell key={idx}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.requestedBy}</TableCell>
              <TableCell>{row.workNum}</TableCell>
              <TableCell>{row.natureOfWork}</TableCell>
              <TableCell>{row.siteName}</TableCell>
              <TableCell>{row.slNo}</TableCell>
              <TableCell>{row.particulars}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.unit}</TableCell>

              <TableCell>
                <TextField
                  value={row.altQty}
                  onChange={(e) => handleChange(i, 'altQty', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.altUnit}
                  onChange={(e) => handleChange(i, 'altUnit', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.plannedFrom}
                  onChange={(e) => handleChange(i, 'plannedFrom', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.plannedTo}
                  onChange={(e) => handleChange(i, 'plannedTo', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.modeOfTransport}
                  onChange={(e) => handleChange(i, 'modeOfTransport', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.costPrice}
                  onChange={(e) => handleChange(i, 'costPrice', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.cpTransport}
                  onChange={(e) => handleChange(i, 'cpTransport', e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.remark}
                  onChange={(e) => handleChange(i, 'remark', e.target.value)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="contained"
        color="success"
        style={{ marginTop: '1rem' }}
        onClick={handleSave}
      >
        💾 Save
      </Button>

      <Button onClick={onBack} style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default Logistics;
