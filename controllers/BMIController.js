import BMI from '../models/BMI.js';

export const addBMI = async (req, res) => {
    try {
        const { height, weight, system } = req.body;

        if (!height || !weight) {
            return res.status(400).json({ message: "Height and weight are required" });
        }

        const userId = req.user;

        let bmiValue;
        if (system === 'imperial') {
            bmiValue = (Number(weight) / (Number(height) ** 2)) * 703;
        } else {
            bmiValue = Number(weight) / ((Number(height) / 100) ** 2);
        }

        let category = "Normal";
        if (bmiValue < 18.5) category = "Underweight";
        else if (bmiValue >= 25 && bmiValue < 30) category = "Overweight";
        else if (bmiValue >= 30) category = "Obese";

        const record = await BMI.create({
            userId: userId, 
            height: Number(height),
            weight: Number(weight),
            bmi: parseFloat(bmiValue.toFixed(2)),
            category,
            system: system || 'metric'
        });

        res.status(201).json(record);
    } catch (err) {
        console.error("Database Error (addBMI):", err);
        res.status(500).json({ message: "Error saving BMI record", error: err.message });
    }
};

export const getBMI = async (req, res) => {
    try {
        // Use the same safe ID check here
        const userId = req.user;
        const records = await BMI.find({ userId }).sort({ createdAt: -1 });
        res.json(records);
    } catch (err) {
        console.error("Database Error (getBMI):", err);
        res.status(500).json({ message: "Error fetching records" });
    }
};

export const deleteBMI = async (req, res) => {
    try {
        // Use the same safe ID check here
        const userId = req.user;
        const record = await BMI.findOneAndDelete({ 
            _id: req.params.id, 
            userId: userId 
        });
        
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Record deleted successfully" });
    } catch (err) {
        console.error("Database Error (deleteBMI):", err);
        res.status(500).json({ message: "Error deleting record" });
    }
};