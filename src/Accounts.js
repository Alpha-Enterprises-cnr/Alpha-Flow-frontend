import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
} from '@mui/material';

function Accounts({ accountData = [], onBack, onApproveStatus }) {
  const [approvedWorks, setApprovedWorks] = useState({});

  const handleDownload = (fileName, fileUrl) => {
    if (!fileName || !fileUrl) {
      alert('File not available for download.');
      return;
    }

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = (entry) => {
    const worknumber = entry.worknumber;
    setApprovedWorks((prev) => ({ ...prev, [worknumber]: true }));

    // ✅ Set clear, simple status
    if (onApproveStatus) {
      onApproveStatus(worknumber, 'Approved by Accounts');
    }
  };

  const getCardColor = (priority) => {
    if (priority === 'High') return 'linear-gradient(to right, rgb(176, 170, 110), #fbc02d)';
    if (priority === 'Medium') return 'linear-gradient(to right, #aed581, #7cb342)';
    return 'linear-gradient(to right, #66bb6a, #2e7d32)';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>Accounts Panel</Typography>

      {accountData.length === 0 ? (
        <Typography>No submissions from Systems yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {accountData.map((entry, idx) => {
            const isApproved = approvedWorks[entry.worknumber] || entry.status?.toLowerCase().includes('approved');

            return (
              <Card
                key={idx}
                style={{
                  background: getCardColor(entry.priority),
                  color: 'black',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                <CardContent>
                  <Typography><strong>Work Number:</strong> {entry.worknumber}</Typography>
                  <Typography><strong>Filled by:</strong> {entry.name}</Typography>
                  <Typography><strong>Site Name:</strong> {entry.sitename}</Typography>
                  <Typography><strong>Nature of Work:</strong> {entry.natureofwork}</Typography>
                  <Typography><strong>Priority:</strong> {entry.priority}</Typography>
                  <Typography><strong>Remarks:</strong> {entry.remarks}</Typography>

                  {entry.files?.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <Typography variant="subtitle2">📎 Files Submitted from Systems:</Typography>
                      {entry.files.map((file, i) => (
                        <Button
                          key={i}
                          variant="outlined"
                          onClick={() => handleDownload(file.name, file.url)}
                          style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                        >
                          {file.name}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: '1rem' }}>
                    {isApproved ? (
                      <Chip label="✅ Approved - Waiting for Workslip" color="success" />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(entry)}
                      >
                        Approve
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      <Button variant="outlined" onClick={onBack} style={{ marginTop: '2rem' }}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default Accounts;
