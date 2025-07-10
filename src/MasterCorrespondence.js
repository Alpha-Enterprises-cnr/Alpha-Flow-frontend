import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  TextField,
  Chip,
} from '@mui/material';

function MasterCorrespondence({ data, onBack, onAssignWorkNumber }) {
  const [workNumbers, setWorkNumbers] = useState({});
  const [notes, setNotes] = useState({});

  const handleAssign = (index) => {
    const newWorkNumber = workNumbers[index];
    if (newWorkNumber && onAssignWorkNumber) {
      onAssignWorkNumber(index, newWorkNumber);
      setWorkNumbers((prev) => ({ ...prev, [index]: '' }));
    }
  };

  const handleNoteChange = (worknumber, value) => {
    setNotes((prev) => ({ ...prev, [worknumber]: value }));
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        minHeight: '100vh',
        color: 'white',
        position: 'relative',
      }}
    >
      <Button
        variant="outlined"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          borderColor: 'white',
        }}
        onClick={onBack}
      >
        ⬅ Back to Dashboard
      </Button>

      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Master Correspondence
      </Typography>

      {data.length === 0 ? (
        <Typography align="center">No correspondence entries found.</Typography>
      ) : (
        <Stack spacing={2} style={{ marginTop: '2rem' }}>
          {[...data].reverse().map((entry, idx) => {
            const index = data.length - 1 - idx;

            let gradientBackground;
            if (entry.priority === 'High') {
              gradientBackground = 'linear-gradient(to right, rgb(176, 170, 110), #fbc02d)';
            } else if (entry.priority === 'Medium') {
              gradientBackground = 'linear-gradient(to right, #aed581, #7cb342)';
            } else {
              gradientBackground = 'linear-gradient(to right, #66bb6a, #2e7d32)';
            }

            return (
              <Card
                key={idx}
                style={{
                  background: gradientBackground,
                  color: 'black',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                <CardContent>
                  <Typography><strong>Filled by:</strong> {entry.name}</Typography>
                  <Typography><strong>Site Name:</strong> {entry.sitename}</Typography>
                  <Typography><strong>Nature of Work:</strong> {entry.natureofwork}</Typography>
                  <Typography><strong>Priority:</strong> {entry.priority}</Typography>
                  <Typography><strong>Remarks:</strong> {entry.remarks}</Typography>

                  {entry.worknumber ? (
                    <>
                      <Typography><strong>Work Number:</strong> {entry.worknumber}</Typography>

                      {/* ✅ Notes Box */}
                      <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        rows={3}
                        value={notes[entry.worknumber] || ''}
                        onChange={(e) => handleNoteChange(entry.worknumber, e.target.value)}
                        style={{ marginTop: '1rem' }}
                      />
                    </>
                  ) : (
                    <div style={{ marginTop: '1rem' }}>
                      <TextField
                        label="Assign Work Number"
                        size="small"
                        value={workNumbers[index] || ''}
                        onChange={(e) =>
                          setWorkNumbers({ ...workNumbers, [index]: e.target.value })
                        }
                        style={{ marginRight: '1rem' }}
                      />
                      <Button variant="contained" size="small" onClick={() => handleAssign(index)}>
                        Assign
                      </Button>
                    </div>
                  )}

                  <Typography style={{ marginTop: '0.5rem' }}>
                    <strong>Status:</strong>{' '}
                    {entry.status
                      ? entry.status
                      : entry.worknumber
                      ? entry.surveySubmitted
                        ? 'Survey Submitted'
                        : 'Registered - waiting for survey supporting documents'
                      : 'Registered - waiting for work number'}
                  </Typography>

                  {entry.surveySubmitted && (
                    <Typography style={{ marginTop: '0.5rem', color: 'blue' }}>
                      📸 Work survey supporting documents have been submitted.
                    </Typography>
                  )}

                  {/* ✅ Show Approved Chip */}
                  {entry.status?.includes('Approved by Accounts') && (
                    <Chip
                      label="✅ Approved by Accounts"
                      color="success"
                      style={{ marginTop: '0.8rem' }}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </div>
  );
}

export default MasterCorrespondence;
