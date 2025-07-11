import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // ✅ Logistics icon

function Dashboard({ onSelect }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4" color="white">
          Welcome to Alpha Dashboard
        </Typography>
      </div>

      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
        {/* Mail App */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('mail')}>
            <EmailIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Mail App</Typography>
          </Paper>
        </Grid>

        {/* General Correspondence */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('general')}>
            <DescriptionIcon fontSize="large" color="secondary" />
            <Typography variant="subtitle1">General Correspondence</Typography>
          </Paper>
        </Grid>

        {/* Master Correspondence */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('master')}>
            <BusinessIcon fontSize="large" color="action" />
            <Typography variant="subtitle1">Master Correspondence</Typography>
          </Paper>
        </Grid>

        {/* Client Form */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('form')}>
            <AssignmentIcon fontSize="large" style={{ color: '#4caf50' }} />
            <Typography variant="subtitle1">Client Form</Typography>
          </Paper>
        </Grid>

        {/* Job Register */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('register')}>
            <AssignmentIcon fontSize="large" style={{ color: '#ff9800' }} />
            <Typography variant="subtitle1">Job Register</Typography>
          </Paper>
        </Grid>

        {/* Operation Head */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('operationHead')}>
            <AdminPanelSettingsIcon fontSize="large" style={{ color: '#f44336' }} />
            <Typography variant="subtitle1">Operation Head</Typography>
          </Paper>
        </Grid>

        {/* Systems */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('supervisor')}>
            <SupervisorAccountIcon fontSize="large" style={{ color: '#00bcd4' }} />
            <Typography variant="subtitle1">Systems</Typography>
          </Paper>
        </Grid>

        {/* Accounts */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('accounts')}>
            <AccountBalanceIcon fontSize="large" style={{ color: '#00bcd4' }} />
            <Typography variant="subtitle1">Accounts</Typography>
          </Paper>
        </Grid>

        {/* 🚚 Logistics */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper elevation={6} style={cardStyle} onClick={() => onSelect('logistics')}>
            <LocalShippingIcon fontSize="large" style={{ color: '#795548' }} />
            <Typography variant="subtitle1">Logistics</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const cardStyle = {
  padding: '1.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '10px',
  background: '#fff',
};

export default Dashboard;
