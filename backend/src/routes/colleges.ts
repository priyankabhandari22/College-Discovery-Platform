import { Router } from 'express';
import type { Stream } from '../types/college.js';
import {
  getColleges,
  getCollegeById,
  getCollegesByIds,
  predictColleges,
} from '../services/collegeService.js';

const router = Router();

router.get('/', (req, res) => {
  const { search, stream, location, minRating } = req.query;

  const colleges = getColleges({
    search: typeof search === 'string' ? search : undefined,
    stream: typeof stream === 'string' ? (stream as Stream) : undefined,
    location: typeof location === 'string' ? location : undefined,
    minRating: typeof minRating === 'string' ? Number(minRating) : undefined,
  });

  res.json(colleges);
});

router.get('/predict', (req, res) => {
  const { exam, rank } = req.query;

  if (typeof exam !== 'string' || typeof rank !== 'string') {
    res.status(400).json({ error: 'exam and rank query params are required' });
    return;
  }

  const rankNum = Number(rank);
  if (Number.isNaN(rankNum) || rankNum < 1) {
    res.status(400).json({ error: 'rank must be a positive number' });
    return;
  }

  res.json(predictColleges(exam, rankNum));
});

router.get('/batch', (req, res) => {
  const idsParam = req.query.ids;
  if (typeof idsParam !== 'string' || !idsParam.trim()) {
    res.status(400).json({ error: 'ids query param is required (comma-separated)' });
    return;
  }

  const ids = idsParam.split(',').map((id) => id.trim()).filter(Boolean);
  res.json(getCollegesByIds(ids));
});

router.get('/:id', (req, res) => {
  const college = getCollegeById(req.params.id);
  if (!college) {
    res.status(404).json({ error: 'College not found' });
    return;
  }
  res.json(college);
});

export default router;
