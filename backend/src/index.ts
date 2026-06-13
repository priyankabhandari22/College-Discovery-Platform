import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import collegesRouter from './routes/colleges.js';

const app = express();
const httpServer = createServer(app);
const PORT = Number(process.env.PORT) || 4000;

const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';

app.use(
  cors({ origin: allowedOrigin, credentials: true })
);
app.use(express.json());

const io = new Server(httpServer, {
  cors: { origin: allowedOrigin, credentials: true },
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join-discussion', (discussionId: string) => {
    socket.join(`discussion:${discussionId}`);
  });

  socket.on('leave-discussion', (discussionId: string) => {
    socket.leave(`discussion:${discussionId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Broadcast endpoint — called by Next.js API routes to emit real-time events
app.post('/api/ws/broadcast', (req, res) => {
  const { event, data } = req.body;
  if (!event || !data) {
    res.status(400).json({ error: 'event and data are required' });
    return;
  }

  if (data.discussionId) {
    io.to(`discussion:${data.discussionId}`).emit(event, data);
  }
  // Always emit to the global room too (for the discussion list)
  io.emit(event, data);

  res.json({ ok: true });
});

app.use('/api/health', (_req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

app.use('/api/colleges', collegesRouter);

httpServer.listen(PORT, () => {
  console.log(`EduTrack API running at http://localhost:${PORT}`);
});
