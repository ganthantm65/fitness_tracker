import BMI from '../models/BMI.js';

export const addBMI = async (req, res) => {
    const { height, weight } = req.body;

    const bmi = weight / ((height / 100) ** 2);

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi > 25) category = "Overweight";

    const record = await BMI.create({
        userId: req.user.id,
        height,
        weight,
        bmi,
        category
    });

    res.json(record);
};

export const getBMI = async (req, res) => {
    res.json(await BMI.find({ userId: req.user.id }));
};