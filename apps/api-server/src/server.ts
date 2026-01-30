import express from 'express';
import { ingestOdds } from '@asb/odds-ingestor';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

// Example endpoint to fetch odds
app.get('/odds', (_req, res) => {
  const odds = ingestOdds();
  res.send({ message: 'Odds endpoint coming soon' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});