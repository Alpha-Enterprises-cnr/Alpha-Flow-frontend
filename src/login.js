import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    onLogin(email, password);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #1e3c72, #2a5298)', // Blue construction theme
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      {/* 🔰 ALPHA Logo */}
      <Typography
        variant="h3"
        style={{
          fontWeight: 'bold',
          color: '#ffc107',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        🏗️ ALPHA
      </Typography>

      <Card
        style={{
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff10',
          border: '1px solid #ffffff30',
          color: 'white',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Office Mail Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <Button variant="contained" color="warning" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default Login;
