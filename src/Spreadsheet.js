// src/Spreadsheet.js
import React, { useState } from 'react';
import { Parser } from 'hot-formula-parser';

const parser = new Parser();

const COLUMN_LABELS = ['A', 'B', 'C'];

function Spreadsheet() {
  const [data, setData] = useState({
    A1: { value: '', formula: '' },
    A2: { value: '', formula: '' },
    A3: { value: '', formula: '' },
    B1: { value: '', formula: '' },
    B2: { value: '', formula: '' },
    B3: { value: '', formula: '' },
    C1: { value: '', formula: '' },
    C2: { value: '', formula: '' },
    C3: { value: '', formula: '' },
  });

  const evaluateFormula = (cellId, formula) => {
    // Set current variables
    Object.entries(data).forEach(([key, cell]) => {
      parser.setVariable(key, parseFloat(cell.value) || 0);
    });

    const result = parser.parse(formula);
    return result.error ? 'ERROR' : result.result;
  };

  const handleChange = (cellId, input) => {
    const newData = { ...data };

    if (input.startsWith('=')) {
      newData[cellId] = {
        formula: input,
        value: evaluateFormula(cellId, input),
      };
    } else {
      newData[cellId] = { value: input, formula: '' };
    }

    setData(newData);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th></th>
            {COLUMN_LABELS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((row) => (
            <tr key={row}>
              <td><strong>{row}</strong></td>
              {COLUMN_LABELS.map((col) => {
                const cellId = `${col}${row}`;
                return (
                  <td key={cellId}>
                    <input
                      style={{ width: '100px' }}
                      value={data[cellId].formula || data[cellId].value}
                      onChange={(e) => handleChange(cellId, e.target.value)}
                    />
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                      {data[cellId].formula && `= ${data[cellId].value}`}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Spreadsheet;
