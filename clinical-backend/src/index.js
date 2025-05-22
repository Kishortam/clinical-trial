// src/index.js
import express from 'express';
import corsConfig from './config/corsConfig.js';
import trialRoutes from './routes/trialRoutes.js';

const app = express();      // App Initialization
const PORT = process.env.PORT || 5000;   // Port and Number

app.use(corsConfig);
app.use(express.json());
app.use('/api', trialRoutes);  // API Route to explore all API Routes


// Testing for, if API Routing works perfectly.

// app.get('/', (req, res) => {
//   res.send('Clinical Trial API is running 🚀');
// });


// 404 and error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});


// Listening Port on browser, it will show below text in terminal.
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
