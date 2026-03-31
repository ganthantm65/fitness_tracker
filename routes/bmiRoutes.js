import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {addBMI, getBMI} from '../controllers/BMIController.js';

const router = express.Router();

router.post('/', auth, addBMI);
router.get('/', auth, getBMI);

export default router;