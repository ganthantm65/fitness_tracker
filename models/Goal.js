import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dailyCalorieGoal: Number,
    weeklyWorkoutGoal: Number
}, { timestamps: true });

export default mongoose.model('Goal', goalSchema);