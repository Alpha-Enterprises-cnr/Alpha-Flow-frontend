import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function Inbox({ user, messages, onCompose, onBack }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleReply = (mail) => {
    const replyData = {
      to: mail.to,
      subject: `Re: ${mail.subject || ''}`,
      message: `\n\n----- Original Message -----\n${mail.message}`,
    };
    onCompose(replyData);
  };

  const filteredMessages = messages.filter((mail) =>
    mail.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        minHeight: '100vh',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Typography variant="h5" gutterBottom>
          Welcome, {user.email}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => onCompose(null)}
          style={{ marginBottom: '1.5rem' }}
        >
          Compose New Mail
        </Button>

        <TextField
          label="Search mail..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginBottom: '1rem',
            backgroundColor: 'white',
            borderRadius: '5px',
          }}
        />

        <Stack spacing={2}>
          {filteredMessages.length === 0 ? (
            <Typography variant="body2" color="white">
              No matching mails found.
            </Typography>
          ) : (
            filteredMessages.map((mail, index) => (
              <Card
                key={index}
                variant="outlined"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: '#ffffff33',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" color="white">
                    To: {mail.to}
                  </Typography>
                  <Typography variant="h6">
                    {mail.subject || '(No subject)'}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {mail.message.length > 100
                      ? mail.message.slice(0, 100) + '...'
                      : mail.message}
                  </Typography>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleReply(mail)}
                    style={{
                      marginTop: '0.5rem',
                      color: 'white',
                      borderColor: 'white',
                    }}
                  >
                    Reply
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </div>

      {/* ⬅ Button at bottom-left inside the container */}
      <div style={{ marginTop: '2rem', textAlign: 'left' }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onBack}
          style={{
            color: 'white',
            borderColor: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        >
          ⬅ Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default Inbox;
