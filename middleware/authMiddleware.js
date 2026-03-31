import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const header = req.header('Authorization');

    if (!header) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = header.startsWith('Bearer ')
        ? header.split(' ')[1]
        : header;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.id; 
        next();
    } catch (error) {
        console.log(error);
        
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;