import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { addBMI, getBMI, deleteBMI } from '../controllers/BMIController.js';

const router = express.Router();

router.post('/', auth, addBMI);
router.get('/', auth, getBMI);
router.delete('/:id', auth, deleteBMI); 

export default router;