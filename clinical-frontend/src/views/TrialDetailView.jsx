import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, Chip, Paper, Divider, Button
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#82ca9d', '#8884d8', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export default function TrialDetailView() {
  const { nctId } = useParams();
  const navigate = useNavigate();
  const [trial, setTrial] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/api/trials/${nctId}`)
  //     .then(res => setTrial(res.data))
  //     .catch(err => console.error(err));
  // }, [nctId]);

  useEffect(() => {
    axios.get(`https://clinical-backend-5gb4.onrender.com/api/trials/${nctId}`)
      .then(res => setTrial(res.data))
      .catch(err => console.error(err));
  }, [nctId]);

  if (!trial) return <Box p={4}><Typography>Loading trial details...</Typography></Box>;

  const chartData = Object.entries(trial.eligibilityValues || {}).map(
    ([key, value]) => ({ name: key, value })
  );

  return (
    <Box p={4}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Trial Detail: {trial.nctId}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" mb={1}>Sponsor: <strong>{trial.sponsorType}</strong></Typography>
        <Typography variant="subtitle1" mb={1}>Enrollment: {trial.enrollmentCount}</Typography>
        <Typography variant="subtitle1" mb={1}>Phase: {trial.phases?.join(', ')}</Typography>
        <Typography variant="subtitle1" mb={1}>Duration: {trial.startDate} → {trial.endDate}</Typography>
        <Typography variant="subtitle1" mt={2}>Locations:</Typography>
        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          {trial.locations?.map((loc, idx) => (
            <Chip key={idx} label={loc} variant="outlined" />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Eligibility Metrics
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 50 }}>
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={70} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
