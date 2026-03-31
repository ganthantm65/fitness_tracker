import Workout from '../models/Workout.js';

export const summary = async (req, res) => {
    const workouts = await Workout.find({ userId: req.user.id });

    const totalCalories = workouts.reduce((a, w) => a + w.calories, 0);
    const totalDuration = workouts.reduce((a, w) => a + w.duration, 0);

    const weeklyData = {};

    workouts.forEach(w => {
        const date = new Date(w.date).toISOString().split('T')[0];
        weeklyData[date] = (weeklyData[date] || 0) + w.calories;
    });

    const typeDistribution = {};
    workouts.forEach(w => {
        typeDistribution[w.type] = (typeDistribution[w.type] || 0) + 1;
    });

    res.json({
        totalWorkouts: workouts.length,
        totalCalories,
        totalDuration,
        weeklyData,
        typeDistribution
    });
};