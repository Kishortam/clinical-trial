import { configureStore } from '@reduxjs/toolkit';
import trialReducer from '../features/trials/trialSlice';

export const store = configureStore({
  reducer: {
    trials: trialReducer,
  },
});
