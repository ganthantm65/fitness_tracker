import Workout from '../models/Workout.js';
import Streak from '../models/Streak.js';

// ================= ADD WORKOUT =================
export const addWorkout = async (req, res) => {
    try {
        const workout = await Workout.create({
            userId: req.user.id,
            ...req.body
        });

        const today = new Date().toISOString().split('T')[0];

        let streak = await Streak.findOne({ userId: req.user.id });

        if (!streak) {
            streak = await Streak.create({
                userId: req.user.id,
                currentStreak: 1,
                lastWorkoutDate: today
            });
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yDate = yesterday.toISOString().split('T')[0];

            if (streak.lastWorkoutDate === today) {
                // same day → no change
            } else if (streak.lastWorkoutDate === yDate) {
                streak.currentStreak += 1;
            } else {
                streak.currentStreak = 1;
            }

            streak.lastWorkoutDate = today;
            await streak.save();
        }

        res.json(workout);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= GET WORKOUTS =================
export const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id })
                                     .sort({ createdAt: -1 });

        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= DELETE WORKOUT =================
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        await workout.deleteOne();

        res.json({ message: "Workout deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};