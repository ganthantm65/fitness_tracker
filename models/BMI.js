import mongoose from 'mongoose';

const bmiSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    height: Number,
    weight: Number,
    bmi: Number,
    category: String,
    system: { type: String, default: 'metric' }
}, { timestamps: true }); 

export default mongoose.model('BMI', bmiSchema);