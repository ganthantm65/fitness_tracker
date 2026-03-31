import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },

    date: {
        type: Date,
        default: Date.now
    },

    notes: String
}, { timestamps: true });

export default mongoose.model('Workout', workoutSchema);