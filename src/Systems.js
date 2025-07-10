import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';

function Systems({
  messages = [],
  onBack,
  onForwardToAccounts,
  onSendWorkslipToOperationHead,
}) {
  const [estimates, setEstimates] = useState({});
  const [workslips, setWorkslips] = useState({});

  const handleEstimateUpload = async (worknumber, file) => {
    if (!file || !file.name.endsWith('.xlsx')) {
      alert('❌ Please upload a valid .xlsx file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      setEstimates((prev) => ({
        ...prev,
        [worknumber]: { name: result.filename, url: result.url },
      }));

      alert('✅ Estimate uploaded successfully');
    } catch (error) {
      alert('❌ Error uploading estimate');
    }
  };

  const handleWorkslipUpload = async (worknumber, file) => {
    if (!file || !(file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      alert('❌ Please upload a valid Excel file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      const uploaded = { name: result.filename, url: result.url };

      setWorkslips((prev) => ({
        ...prev,
        [worknumber]: uploaded,
      }));

      alert('✅ Workslip uploaded');
    } catch (err) {
      alert('❌ Upload failed');
    }
  };

  const handleWorkslipSubmit = (entry, workslipFile) => {
    if (!workslipFile) {
      alert('❌ Please upload the workslip file first');
      return;
    }

    if (onSendWorkslipToOperationHead) {
      onSendWorkslipToOperationHead(entry.worknumber, workslipFile, entry);
    }

    alert(`✅ Workslip for Work Number ${entry.worknumber} sent to Operation Head`);
  };

  const handleFinalSubmit = (worknumber) => {
    const entry = messages.find((msg) => msg.worknumber === worknumber);
    const estimateFile = estimates[worknumber];

    if (!entry || !estimateFile) {
      alert('❌ Entry or estimate missing.');
      return;
    }

    const fullEntry = { ...entry, estimate: estimateFile };

    if (onForwardToAccounts) {
      onForwardToAccounts(fullEntry);
    }

    alert(`✅ Estimate for Work Number ${worknumber} submitted to Accounts.`);
  };

  const getCardColor = (priority) => {
    if (priority === 'High') return 'linear-gradient(to right, rgb(176, 170, 110), #fbc02d)';
    if (priority === 'Medium') return 'linear-gradient(to right, #aed581, #7cb342)';
    return 'linear-gradient(to right, #66bb6a, #2e7d32)';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>Systems Panel</Typography>

      {messages.length === 0 ? (
        <Typography>No submissions yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {messages.map((entry, idx) => {
            const estimateFile = estimates[entry.worknumber];
            const workslipFile = workslips[entry.worknumber];
            const isApproved = entry.status?.toLowerCase().includes('approved');

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

                  {/* ✅ Only show files if they exist */}
                  {!isApproved && entry.files?.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <Typography variant="subtitle2">📎 Submitted Files:</Typography>
                      {entry.files.map((file, i) => (
                        <Button
                          key={i}
                          variant="outlined"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = file.url;
                            link.setAttribute('download', file.name);
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                        >
                          {file.name}
                        </Button>
                      ))}
                    </div>
                  )}

                  {!isApproved ? (
                    <>
                      <div style={{ marginTop: '1rem' }}>
                        <Typography variant="subtitle2">📤 Upload Estimate (.xlsx)</Typography>
                        <input
                          type="file"
                          accept=".xlsx"
                          onChange={(e) =>
                            handleEstimateUpload(entry.worknumber, e.target.files[0])
                          }
                        />
                      </div>

                      {estimateFile && (
                        <>
                          <Typography variant="subtitle2" style={{ marginTop: '1rem' }}>
                            📄 Uploaded Estimate: {estimateFile.name}
                          </Typography>
                          <Button
                            variant="contained"
                            color="success"
                            style={{ marginTop: '1rem' }}
                            onClick={() => handleFinalSubmit(entry.worknumber)}
                          >
                            ✅ Submit Estimate
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                        ✅ Approved — Upload and Send Workslip
                      </Typography>

                      <div style={{ marginTop: '1rem' }}>
                        <Typography variant="subtitle2">📤 Upload Workslip (.xlsx/.xls)</Typography>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={(e) =>
                            handleWorkslipUpload(entry.worknumber, e.target.files[0])
                          }
                        />
                      </div>

                      {workslipFile && (
                        <>
                          <Typography style={{ marginTop: '0.5rem', color: 'green' }}>
                            ✅ Uploaded: {workslipFile.name}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => handleWorkslipSubmit(entry, workslipFile)}
                          >
                            📤 Submit Workslip to Operation Head
                          </Button>
                        </>
                      )}
                    </>
                  )}
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

export default Systems;
