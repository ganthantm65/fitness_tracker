import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { summary } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/summary', auth, summary);

export default router;