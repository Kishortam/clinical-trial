// src/routes/trialRoutes.js
import express from 'express';
import {
  getTrials,
  getTrialById,
  getDashboardData,
  getScoreData
} from '../controllers/trialController.js';

const router = express.Router();

router.get('/trials', getTrials);        // To get all trials
router.get('/trials/:id', getTrialById); // To get a specific trial using Id
router.get('/dashboard-data', getDashboardData); // To get aggregated data
router.get('/score-data', getScoreData); // To get aggregated data

export default router;
