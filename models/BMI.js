import mongoose from 'mongoose';

const bmiSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    height: Number,
    weight: Number,
    bmi: Number,
    category: String,
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    }
});

export default mongoose.model('BMI', bmiSchema);