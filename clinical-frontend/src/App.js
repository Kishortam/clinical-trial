import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import TrialListView from './features/trials/TrialListView';
import DashboardView from './views/DashboardView';
import ScoreView from './views/ScoreView';
import TrialDetailView from './views/TrialDetailView';

import { useDispatch } from 'react-redux';
import { clearSelections } from './features/trials/trialSlice';



const App = () => {

  const dispatch = useDispatch(); // To dispatch actions

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Clinical Trial Similarity Viewer
          </Typography>
          <Button component={Link} to="/" color="inherit">List View</Button>
          <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
          <Button component={Link} to="/score" color="inherit">Score View</Button>
          {/* To clear selections */}
          <Button color="inherit" onClick={() => dispatch(clearSelections())}>Clear Selections</Button>  
        </Toolbar>
      </AppBar>

      <Box mt={2}>
        <Routes>
          <Route path="/" element={<TrialListView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/score" element={<ScoreView />} />
          <Route path="/trial/:nctId" element={<TrialDetailView />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
