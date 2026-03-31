import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currentStreak: { type: Number, default: 0 },
    lastWorkoutDate: String
});

export default mongoose.model('Streak', streakSchema);