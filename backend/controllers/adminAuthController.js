import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/adminModel.js';
import jwt from 'jsonwebtoken';

// Function to register a new user
export const registerUser = async (req, res) => {
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;
    password = toString(password);

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Function to login a user
export const loginUser = async (req, res) => {
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('password').notEmpty().withMessage('Password is required').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const generateToken = (user) => {
        const payload = { id: user._id, email: user.email };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    };
    let { email, password } = req.body;
    password = toString(password);
    
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        const authToken = generateToken(user);
        res.status(200).json({ msg: 'User logged in successfully', authToken: authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};