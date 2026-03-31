import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { addWorkout, getWorkouts, deleteWorkout } from '../controllers/workoutController.js';

const router = express.Router();

router.post('/', auth, addWorkout);
router.get('/', auth, getWorkouts);
router.delete('/:id', auth, deleteWorkout);

export default router;