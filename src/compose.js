import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Compose({ onSend, onBack }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!to) {
      alert('Recipient (To) is required!');
      return;
    }

    if (!message && !attachment) {
      alert('Please write a message or attach a file.');
      return;
    }

    onSend({ to, subject, message, attachment });
  };

  return (
    <Card
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '2rem auto',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Compose Email
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="To"
            variant="outlined"
            fullWidth
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            InputProps={{ style: { backgroundColor: 'white' } }}
          />

          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputProps={{ style: { backgroundColor: 'white' } }}
          />

          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{ style: { backgroundColor: 'white' } }}
          />

          {/* 📎 File Input */}
          <div>
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              onChange={(e) => setAttachment(e.target.files[0])}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                style={{ backgroundColor: '#ffffff33', color: 'white' }}
              >
                📎 Choose File
              </Button>
              {attachment && (
                <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
                  Selected: {attachment.name}
                </Typography>
              )}
            </label>
          </div>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
            <Button variant="outlined" color="secondary" onClick={onBack}>
              Back to Inbox
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}

export default Compose;
