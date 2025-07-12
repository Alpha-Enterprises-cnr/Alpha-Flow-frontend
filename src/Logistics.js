import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Logistics({ data = [], onBack }) {
  const [logisticsInputs, setLogisticsInputs] = useState({});

  const handleInputChange = (i, j, field, value) => {
    setLogisticsInputs((prev) => {
      const key = `${i}-${j}`;
      const row = prev[key] || {};
      return { ...prev, [key]: { ...row, [field]: value } };
    });
  };

  const handleSave = () => {
    console.log('🚚 Saved logistics data:', logisticsInputs);
    alert('✅ Logistics data saved (see console)');
  };

  return (
    <div style={{ padding: '2rem', overflowX: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        <LocalShippingIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        Logistics Tracker
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
          {data.map((entry, i) =>
            (entry.items || []).map((row, j) => {
              const key = `${i}-${j}`;
              const logisticsRow = logisticsInputs[key] || {};
              return (
                <TableRow key={key}>
                  {/* Read-only client data */}
                  <TableCell>{entry.requestedBy}</TableCell>
                  <TableCell>{entry.workNumber}</TableCell>
                  <TableCell>{entry.natureOfWork}</TableCell>
                  <TableCell>{entry.siteName}</TableCell>
                  <TableCell>{row.workSlNo}</TableCell>
                  <TableCell>{row.particulars}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.units}</TableCell>

                  {/* Editable logistics data */}
                  <TableCell>
                    <TextField
                      value={logisticsRow.altQty || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'altQty', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.altUnit || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'altUnit', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.from || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'from', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.to || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'to', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.transport || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'transport', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.costPrice || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'costPrice', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.cpTransport || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'cpTransport', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={logisticsRow.remark || ''}
                      onChange={(e) =>
                        handleInputChange(i, j, 'remark', e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <div style={{ marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          SAVE
        </Button>

        <Button
          variant="text"
          color="primary"
          onClick={onBack}
          style={{ marginLeft: '1rem' }}
          startIcon={<ArrowBackIcon />}
        >
          BACK TO DASHBOARD
        </Button>
      </div>
    </div>
  );
}

export default Logistics;
