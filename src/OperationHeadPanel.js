import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

function OperationHeadPanel({
  jobData,
  currentUser,
  onBack,
  onSubmitToSystems,
  systemsWork = [],
}) {
  const [drawingFiles, setDrawingFiles] = useState({});
  const [surveyImages, setSurveyImages] = useState({});
  const [breakupImages, setBreakupImages] = useState({});
  const [excelFiles, setExcelFiles] = useState({});

  const isOperationHead = currentUser?.trim().toLowerCase() === 'operationhead@gmail.com';

  const forwardedJobs = Object.values(
    jobData
      .filter((entry) => entry.worknumber)
      .reduce((acc, entry) => {
        acc[entry.worknumber] = entry;
        return acc;
      }, {})
  );

  // ✅ Exclude work cards that are already submitted to Systems
  const submittedWorknumbers = systemsWork.map((e) => e.worknumber);
  const allJobs = forwardedJobs.filter(
    (job) => !submittedWorknumbers.includes(job.worknumber)
  );

  const getCardColor = (priority) => {
    if (priority === 'High') return 'linear-gradient(to right, rgb(176, 170, 110), #fbc02d)';
    if (priority === 'Medium') return 'linear-gradient(to right, #aed581, #7cb342)';
    return 'linear-gradient(to right, #66bb6a, #2e7d32)';
  };

  const handleSubmitAll = async (entry) => {
    const worknumber = entry.worknumber;
    const uploadedFiles = [];

    const drawing = drawingFiles[worknumber];
    if (drawing) {
      const formData = new FormData();
      formData.append('file', drawing);
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      uploadedFiles.push({ name: result.filename, url: result.url });
    }

    for (const img of surveyImages[worknumber] || []) {
      const formData = new FormData();
      formData.append('file', img);
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      uploadedFiles.push({ name: result.filename, url: result.url });
    }

    const excelFile = excelFiles[worknumber];
    if (excelFile) {
      const formData = new FormData();
      formData.append('file', excelFile);
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      uploadedFiles.push({ name: result.filename, url: result.url });
    }

    if (onSubmitToSystems) {
      onSubmitToSystems({
        ...entry,
        files: uploadedFiles,
        priority: entry.priority,
      });
    }

    setDrawingFiles((prev) => ({ ...prev, [worknumber]: null }));
    setSurveyImages((prev) => ({ ...prev, [worknumber]: [] }));
    setExcelFiles((prev) => ({ ...prev, [worknumber]: null }));
  };

  if (!isOperationHead) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Access Denied: You are not authorized to access this panel.
        </Typography>
        <Button onClick={onBack} variant="outlined" style={{ marginTop: '1rem' }}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>Operation Head Panel</Typography>

      <Stack spacing={2}>
        {allJobs.length === 0 ? (
          <Typography>No new work items to process.</Typography>
        ) : (
          allJobs.map((entry, idx) => {
            const worknumber = entry.worknumber;
            const drawingUploaded = !!drawingFiles[worknumber];
            const surveyUploaded = (surveyImages[worknumber]?.length || 0) > 0;
            const breakupUploaded = !!breakupImages[worknumber];
            const excelUploaded = !!excelFiles[worknumber];

            const canSubmit =
              drawingUploaded &&
              surveyUploaded &&
              (breakupUploaded || excelUploaded);

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
                  <Typography><strong>Work Number:</strong> {worknumber}</Typography>
                  <Typography><strong>Filled by:</strong> {entry.name}</Typography>
                  <Typography><strong>Site Name:</strong> {entry.sitename}</Typography>
                  <Typography><strong>Nature of Work:</strong> {entry.natureofwork}</Typography>
                  <Typography><strong>Priority:</strong> {entry.priority}</Typography>
                  <Typography><strong>Remarks:</strong> {entry.remarks}</Typography>

                  <div style={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle2">📄 Upload Drawing File (Required)</Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xlsx,.csv"
                      onChange={(e) =>
                        setDrawingFiles((prev) => ({ ...prev, [worknumber]: e.target.files[0] }))
                      }
                    />
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle2">📷 Upload Site Survey Images (Required, Max 10)</Typography>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      multiple
                      onChange={(e) => {
                        const selected = Array.from(e.target.files);
                        if (selected.length > 10) {
                          alert('❌ Max 10 images only');
                          return;
                        }
                        setSurveyImages((prev) => ({ ...prev, [worknumber]: selected }));
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle2">🖼️ Upload Break-up Sheet Image (.jpg/.png)</Typography>
                    <input
                      type="file"
                      accept=".jpg,.png"
                      onChange={(e) =>
                        setBreakupImages((prev) => ({ ...prev, [worknumber]: e.target.files[0] }))
                      }
                    />
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle2">📥 Download Blank Breakup Sheet</Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        window.open('http://localhost:5000/brsFiles/breakupsheet.xlsx', '_blank')
                      }
                    >
                      📊 Download Excel Estimate Sheet
                    </Button>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle2">📤 Upload Filled Excel Estimate (.xlsx)</Typography>
                    <input
                      type="file"
                      accept=".xlsx"
                      onChange={(e) =>
                        setExcelFiles((prev) => ({ ...prev, [worknumber]: e.target.files[0] }))
                      }
                    />
                  </div>

                  {canSubmit && (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      style={{ marginTop: '1rem' }}
                      onClick={() => handleSubmitAll(entry)}
                    >
                      🚀 Submit to Systems
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>

      {/* ✅ Section for viewing files from Systems */}
      {systemsWork.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <Typography variant="h6" gutterBottom>
            📥 Files Received from Systems
          </Typography>

          <Stack spacing={2}>
            {systemsWork.map((entry, idx) => (
              <Card
                key={idx}
                style={{
                  background: '#f5f5f5',
                  color: '#333',
                  borderRadius: '10px',
                  boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <CardContent>
                  <Typography><strong>Work Number:</strong> {entry.worknumber}</Typography>

                  {entry.estimate && (
                    <div style={{ marginTop: '1rem' }}>
                      <Typography variant="subtitle2">📊 Estimate File</Typography>
                      <Button
                        variant="outlined"
                        href={entry.estimate.url}
                        download={entry.estimate.name}
                        target="_blank"
                      >
                        {entry.estimate.name}
                      </Button>
                    </div>
                  )}

                  {entry.workslips?.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <Typography variant="subtitle2">📄 Workslips</Typography>
                      {entry.workslips.map((file, i) => (
                        <Button
                          key={i}
                          variant="outlined"
                          href={file.url}
                          download={file.name}
                          target="_blank"
                          style={{ margin: '0.2rem' }}
                        >
                          {file.name}
                        </Button>
                      ))}
                    </div>
                  )}

                  {entry.drawings?.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <Typography variant="subtitle2">📐 Drawings</Typography>
                      {entry.drawings.map((file, i) => (
                        <Button
                          key={i}
                          variant="outlined"
                          href={file.url}
                          download={file.name}
                          target="_blank"
                          style={{ margin: '0.2rem' }}
                        >
                          {file.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </div>
      )}

      <Button
        onClick={onBack}
        variant="outlined"
        style={{ marginTop: '2rem' }}
      >
        Back to Dashboard
      </Button>
    </div>
  );
}

export default OperationHeadPanel;
