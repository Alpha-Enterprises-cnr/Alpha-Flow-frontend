import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';

function Logistics({ logisticsData = [], onBack }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>🚚 Logistics Panel</Typography>

      {logisticsData.length === 0 ? (
        <Typography>No logistics data available.</Typography>
      ) : (
        <Stack spacing={2}>
          {logisticsData.map((entry, idx) => (
            <Card
              key={idx}
              style={{
                background: '#e0f7fa',
                borderRadius: '10px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Typography><strong>Work Number:</strong> {entry.worknumber}</Typography>
                <Typography><strong>Site Name:</strong> {entry.sitename}</Typography>
                <Typography><strong>Material:</strong> {entry.particulars}</Typography>
                <Typography><strong>Qty:</strong> {entry.quantity}</Typography>
                <Typography><strong>Unit:</strong> {entry.unit}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <Button
        variant="outlined"
        onClick={onBack}
        style={{ marginTop: '2rem' }}
      >
        ⬅ Back to Dashboard
      </Button>
    </div>
  );
}

export default Logistics;
