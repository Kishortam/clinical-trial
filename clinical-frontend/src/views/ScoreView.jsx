import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from '@mui/material';

export default function ScoreView() {
  const selectedIds = useSelector(state => state.trials.selectedIds);
  const [scoreData, setScoreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedIds.length) {
      setLoading(true);
      const idsParam = selectedIds.join(',');
      axios.get(`https://clinical-backend-5gb4.onrender.com/api/score-data?ids=${idsParam}`)
        .then(res => setScoreData(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedIds]);

  if (!selectedIds.length) {
    return (
      <Box p={4}>
        <Typography variant="h6">No trials selected.</Typography>
        <Typography>Select trials in the List View to see similarity scores.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>Score View</Typography>
      {loading ? (
        <Typography>Loading scores...</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Trial ID</TableCell>
                <TableCell>Similarity Score</TableCell>
                <TableCell>Visual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreData.map((trial) => (
                <TableRow key={trial.nctId} hover>
                  <TableCell>{trial.nctId}</TableCell>
                  <TableCell>{trial.similarity_score}</TableCell>
                  <TableCell>
                    <LinearProgress
                      variant="determinate"
                      value={trial.similarity_score}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
