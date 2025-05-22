// src/controllers/trialController.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module-friendly __dirname
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);

// Load JSON once
// const dataPath = path.join(__dirname, '../sample-data.json');  // previously
const dataPath = path.join(__dirname, 'sample-data.json');
const trials = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));


// function for getting all trials
export const getTrials = (req, res) => {
  const page = parseInt(req.query.page) || 1;    // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to limit 10
  const start = (page - 1) * limit;              // start index
  const paginated = trials.slice(start, start + limit); // Paginate
  res.json({ page, limit, total: trials.length, data: paginated });  // Return paginated data
};


// Function for getting a specific trial
export const getTrialById = (req, res) => {
  const trial = trials.find(t => t.nctId === req.params.id);  // Find the trial by Id, if NCT Id is valid
  if (!trial) return res.status(404).json({ error: 'Trial not found' }); // Return 404 if not found 
  res.json(trial);    // Return the trial
};


// Function for getting aggregated data / dashboard data
export const getDashboardData = (req, res) => {
  const ids = (req.query.ids || '').split(',');    // Get Ids from query
  const selected = trials.filter(t => ids.includes(t.nctId));  // Filter by Ids
  if (!selected.length) return res.status(400).json({ error: 'No valid IDs' }); // Return 400 if no valid Ids

  const keys = Object.keys(selected[0].eligibilityValues);   // Get keys
  const aggregated = keys.reduce((agg, key) => {             
    agg[key] = selected.reduce((sum, t) => sum + (t.eligibilityValues[key] || 0), 0);  // Calculate sum
    return agg;
  }, {});

  res.json(aggregated);   // Return aggregated data
};


// Function for getting aggregated data / score data
export const getScoreData = (req, res) => {
  const ids = (req.query.ids || '').split(',');  // Get Ids from query
  const result = trials
    .filter(t => ids.includes(t.nctId))
    .map(t => ({ nctId: t.nctId, similarity_score: t.similarity_score }));  // Filter by Ids
  res.json(result);     // Return aggregated data
};

// export default {
//   getTrials,
//   getTrialById,
//   getDashboardData,
//   getScoreData
// };