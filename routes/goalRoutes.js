import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { setGoal, getGoal } from '../controllers/goalController.js';

const router = express.Router();

router.post('/', auth, setGoal);
router.get('/', auth, getGoal);

export default router;