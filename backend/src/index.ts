import express from 'express';
import cors from 'cors';
import collegesRouter from './routes/colleges.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/health', (_req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

app.use('/api/colleges', collegesRouter);

app.listen(PORT, () => {
  console.log(`EduTrack API running at http://localhost:${PORT}`);
});
