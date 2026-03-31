import Goal from '../models/Goal.js';

export const setGoal = async (req, res) => {
    let goal = await Goal.findOne({ userId: req.user.id });

    if (goal) {
        Object.assign(goal, req.body);
        await goal.save();
    } else {
        goal = await Goal.create({ userId: req.user.id, ...req.body });
    }

    res.json(goal);
};

export const getGoal = async (req, res) => {
    res.json(await Goal.findOne({ userId: req.user.id }));
};