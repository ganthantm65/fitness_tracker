import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Weight goals
    targetWeight: Number,
    currentWeight: Number,
    startWeight: Number,
    targetDate: String,

    // Fitness goals
    dailyCalorieGoal: Number,
    weeklyWorkoutGoal: Number

}, { timestamps: true });

export default mongoose.model('Goal', goalSchema);