import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Pagination, Select, MenuItem, Box, 
  Typography, FormControl, InputLabel
} from '@mui/material';
import {fetchTrials, toggleSelect, setPage, setLimit} from './trialSlice';
import TrialTable from '../../components/TrialTable';

const TrialListView = () => {
  const dispatch = useDispatch();
  const { data, selectedIds, page, limit, total, loading } = useSelector(state => state.trials); // Get state from store

  useEffect(() => {
    dispatch(fetchTrials({ page, limit }));  // Fetch trials when page or limit changes
  }, [dispatch, page, limit]);               // Only re-fetch when page or limit changes

  const totalPages = Math.ceil(total / limit);    // Calculate total number of pages by dividing total by limit

  return (
    <Box px={4}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        Clinical Trials - List View
      </Typography>

      {loading ? <Typography>Loading...</Typography> : (
        <>
          <TrialTable
            trials={data}
            selectedIds={selectedIds}
            onSelect={id => dispatch(toggleSelect(id))} // Dispatch toggleSelect action
          />

          <Box display="flex" justifyContent="space-between" mt={3} alignItems="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => dispatch(setPage(value))}
              color="primary"
            />
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel>Rows</InputLabel>
              <Select
                value={limit}
                onChange={e => dispatch(setLimit(e.target.value))}
              >
                {[5, 10, 20].map(n => (
                  <MenuItem key={n} value={n}>{n} per page</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TrialListView;
