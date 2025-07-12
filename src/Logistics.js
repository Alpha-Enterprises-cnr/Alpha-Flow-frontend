import React from 'react';
import { Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function Logistics({ items = [], onBack }) {
  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        🚛 Logistics Tracker
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Requested By</TableCell>
            <TableCell>Work No.</TableCell>
            <TableCell>Nature of Work</TableCell>
            <TableCell>Site Name</TableCell>
            <TableCell>Sl.No</TableCell>
            <TableCell>Particulars</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            {/* ➕ Add Additional Editable Fields Below */}
            <TableCell>Alt.Qty</TableCell>
            <TableCell>Alt.Unit</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Transport</TableCell>
            <TableCell>Cost Price</TableCell>
            <TableCell>CP + Transport</TableCell>
            <TableCell>Remark</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((entry, i) =>
            entry.items.map((row, j) => (
              <TableRow key={`${i}-${j}`}>
                <TableCell>{entry.requestedBy}</TableCell>
                <TableCell>{entry.workNumber}</TableCell>
                <TableCell>{entry.natureOfWork}</TableCell>
                <TableCell>{entry.siteName}</TableCell>

                {/* These are from materialRows */}
                <TableCell>{row.workSlNo}</TableCell>
                <TableCell>{row.particulars}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>{row.units}</TableCell>

                {/* Editable Fields for Logistician */}
                <TableCell><input type="text" /></TableCell>
                <TableCell><input type="text" /></TableCell>
                <TableCell><input type="text" placeholder="From" /></TableCell>
                <TableCell><input type="text" placeholder="To" /></TableCell>
                <TableCell><input type="text" placeholder="Mode" /></TableCell>
                <TableCell><input type="number" /></TableCell>
                <TableCell><input type="number" /></TableCell>
                <TableCell><input type="text" placeholder="Remark" /></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div style={{ marginTop: '2rem' }}>
        <Button variant="contained" color="success" startIcon={<span>💾</span>}>
          SAVE
        </Button>
        <Button onClick={onBack} style={{ marginLeft: '1rem' }}>
          BACK TO DASHBOARD
        </Button>
      </div>
    </div>
  );
}

export default Logistics;
