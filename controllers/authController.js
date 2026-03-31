import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (await User.findOne({ email })) {
        return res.status(400).json({ message: "User exists" });
    }

    const user = await User.create({ username, email, password });

    res.json({ message: "Registered successfully" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
        token: generateToken(user._id),
        username: user.username
    });
};