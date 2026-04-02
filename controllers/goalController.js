import Goal from '../models/Goal.js';

export const setGoal = async (req, res) => {
    try {
        const {
            targetWeight,
            currentWeight,
            startWeight,
            targetDate,
            dailyCalorieGoal,
            weeklyWorkoutGoal
        } = req.body;

        let goal = await Goal.findOne({ userId: req.user.id });

        const updatedData = {
            targetWeight: Number(targetWeight),
            currentWeight: Number(currentWeight),
            startWeight: Number(startWeight),
            targetDate,
            dailyCalorieGoal: Number(dailyCalorieGoal),
            weeklyWorkoutGoal: Number(weeklyWorkoutGoal)
        };

        if (goal) {
            Object.assign(goal, updatedData);
            await goal.save();
        } else {
            goal = await Goal.create({
                userId: req.user.id,
                ...updatedData
            });
        }

        res.json(goal);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getGoal = async (req, res) => {
    res.json(await Goal.findOne({ userId: req.user.id }));
};