import React from 'react';
import { Typography, Card, CardContent, Button, Stack } from '@mui/material';

function GeneralCorrespondence({ data, onBack }) {
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
      {/* 🔙 Back to Dashboard (Top Left) */}
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
        General Correspondence
      </Typography>

      {data.length === 0 ? (
        <Typography align="center">No correspondence entries found.</Typography>
      ) : (
        <Stack spacing={2} style={{ marginTop: '2rem' }}>
          {[...data].reverse().map((entry, idx) => {
            let gradientBackground;

            if (entry.priority === 'High') {
              gradientBackground = 'linear-gradient(to right,rgb(176, 170, 110), #fbc02d)';
            } else if (entry.priority === 'Medium') {
              gradientBackground = 'linear-gradient(to right, #aed581, #7cb342)';
            } else if (entry.priority === 'Low') {
              gradientBackground = 'linear-gradient(to right, #66bb6a, #2e7d32)';
            } else {
              gradientBackground = 'rgba(255,255,255,0.1)';
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
                  <Typography><strong>Client:</strong> {entry.name}</Typography>
                  <Typography><strong>Email:</strong> {entry.email}</Typography>
                  <Typography><strong>Project:</strong> {entry.project}</Typography>
                  <Typography><strong>Department:</strong> {entry.department}</Typography>
                  <Typography><strong>Priority:</strong> {entry.priority}</Typography>
                  <Typography><strong>Work number:</strong> {entry.worknumber}</Typography>
                  <Typography><strong>Remarks:</strong> {entry.remarks}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Optional Bottom Left Back Button (can remove if not needed) */}
      <Button
        variant="outlined"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          color: 'white',
          borderColor: 'white',
        }}
        onClick={onBack}
      >
        ⬅ Back
      </Button>
    </div>
  );
}

export default GeneralCorrespondence;
