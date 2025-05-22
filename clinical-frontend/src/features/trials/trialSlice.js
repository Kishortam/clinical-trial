import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Load from localStorage
const loadSelectedIds = () => {
  try {
    const stored = localStorage.getItem('selectedTrialIds');  // Get from localStorage
    return stored ? JSON.parse(stored) : [];                  // Parse to array
  } catch {
    return [];
  }
};

// Save to localStorage
const saveSelectedIds = (ids) => {
  localStorage.setItem('selectedTrialIds', JSON.stringify(ids));  // Save to localStorage
};


// Thunk for fetching trials
export const fetchTrials = createAsyncThunk(
  'trials/fetchTrials',
  async ({ page, limit }) => {
    const res = await axios.get(`http://localhost:5000/api/trials?page=${page}&limit=${limit}`);
    return res.data;
  }
);

const trialSlice = createSlice({
  name: 'trials',
  initialState: {
    data: [],
    total: 0,
    selectedIds: loadSelectedIds(),
    page: 1,
    limit: 5,
    loading: false,
  },
  reducers: {          // Actions
    toggleSelect: (state, action) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(item => item !== id);
      } else {
        state.selectedIds.push(id);
      }
      saveSelectedIds(state.selectedIds); // save to localStorage
    },
    setPage: (state, action) => {
      state.page = action.payload;  // Set page
    },
    setLimit: (state, action) => {
      state.limit = action.payload; // Set limit
    },
    clearSelections: (state) => {
      state.selectedIds = [];
      saveSelectedIds([]);    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      });
  },
});

export const { toggleSelect, setPage, setLimit, clearSelections } = trialSlice.actions;
export default trialSlice.reducer;
