import { check } from "express-validator";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const userSignupValidator = [
    check('username').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
]

export const userSigninValidator = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters')
]

// Check if user is signed in
export const authentication = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized'});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden', error: err.message });
        } else {
            const user = await User.findOne({ _id: decoded._id })
            if (!user) {
                res.status(403).json({ message: 'Forbidden. User does not exist.' });
            }
            req.user = decoded._id;
            next();
        }
    });
}
