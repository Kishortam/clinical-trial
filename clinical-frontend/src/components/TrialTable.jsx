import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Checkbox, Paper
} from '@mui/material';


// ListView or Trial Table
const TrialTable = ({ trials, selectedIds, onSelect }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Sponsor</TableCell>
            <TableCell>Enrollment</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Locations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trials.map(trial => (
            <TableRow
              key={trial.nctId}
              hover
              sx={{
                '&:hover': {
                  backgroundColor: '#f0f8ff',
                }
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(trial.nctId)}
                  onChange={() => onSelect(trial.nctId)}
                  color="primary"
                />
              </TableCell>
              {/* <TableCell>{trial.nctId}</TableCell> */}
              <TableCell>
                <Link to={`/trial/${trial.nctId}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                  {trial.nctId}
                </Link>
              </TableCell>
              <TableCell>{trial.sponsorType}</TableCell>
              <TableCell>{trial.enrollmentCount}</TableCell>
              <TableCell>{trial.startDate}</TableCell>
              <TableCell>{trial.endDate}</TableCell>
              <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {trial.locations.join(', ')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrialTable;
