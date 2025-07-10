import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function BreakupSheetEditor({ fileUrl }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchAndParseExcel = async () => {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const [headerRow, ...rows] = json;
    setHeaders(headerRow);
    setData(rows);
    setLoaded(true);
  };

  const handleCellChange = (rowIdx, colIdx, value) => {
    const updated = [...data];
    updated[rowIdx][colIdx] = value;
    setData(updated);
  };

  const exportUpdatedExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'UpdatedBreakupSheet.xlsx');
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {!loaded ? (
        <Button variant="outlined" color="primary" onClick={fetchAndParseExcel}>
          📂 Load & Edit Breakup Sheet
        </Button>
      ) : (
        <>
          <Typography variant="h6" style={{ margin: '1rem 0' }}>
            ✏️ Editable Breakup Sheet
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableCell key={idx}><strong>{header}</strong></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {headers.map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <TextField
                        value={row[colIdx] || ''}
                        onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                        size="small"
                        variant="standard"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" color="success" onClick={exportUpdatedExcel} style={{ marginTop: '1rem' }}>
            💾 Save & Download Excel
          </Button>
        </>
      )}
    </div>
  );
}

export default BreakupSheetEditor;
