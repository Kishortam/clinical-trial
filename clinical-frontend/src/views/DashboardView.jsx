import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Card, CardContent, Grid, Chip, Divider, Tooltip, Stack, Paper
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer, LabelList
} from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c',
  '#d0ed57', '#ffc0cb', '#bebebe', '#a0522d'
];

// Dashboard View
export default function DashboardView() {
  const selectedIds = useSelector(state => state.trials.selectedIds);
  const [dashboardData, setDashboardData] = useState(null);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    if (selectedIds.length) {      // If trials are selected
      const idsParam = selectedIds.join(',');
      axios.get(`http://localhost:5000/api/dashboard-data?ids=${idsParam}`)
        .then(res => setDashboardData(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedIds]);

  if (!selectedIds.length) {     // If no trials selected, show message
    return (
      <Box p={4}>
        <Typography variant="h6">No trials selected.</Typography>
        <Typography>Select trials in the List View to see dashboard analytics.</Typography>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box p={4}><Typography>Loading dashboard data...</Typography></Box>
    );
  }

  const chartData = Object.entries(dashboardData).map(([key, value]) => ({ name: key, value }));
  const summaryStats = chartData.sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>📊 Dashboard View</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl variant="standard" sx={{ minWidth: 180 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={e => setChartType(e.target.value)}
          >
            <MenuItem value="bar">📶 Bar Chart</MenuItem>
            <MenuItem value="pie">🥧 Pie Chart</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1} mt={{ xs: 2, md: 0 }}>
          {summaryStats.map(stat => (
            <Tooltip key={stat.name} title={`Top metric: ${stat.name}`}> 
              <Chip label={`${stat.name.toUpperCase()}: ${stat.value}`} color="secondary" variant="outlined" />
            </Tooltip>
          ))}
        </Stack>
      </Stack>

      <Card elevation={4} sx={{ borderRadius: 3, p: 2, background: '#fdfdfd' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Aggregated Eligibility Metrics for <strong>{selectedIds.length}</strong> Trial{selectedIds.length > 1 ? 's' : ''}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <ResponsiveContainer width="100%" height={450}>
            {chartType === 'bar' ? (
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
              >
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={80} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ fontSize: 14 }} />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 13 }} />
                <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="value" position="top" style={{ fontSize: 12 }} />
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, value, percent }) => `${name} (${value}) - ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ fontSize: 14 }} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            )}
          </ResponsiveContainer>

          <Box mt={4}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Selected Trial IDs:</Typography>
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedIds.map(id => <Chip key={id} label={id} size="small" color="primary" />)}
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
