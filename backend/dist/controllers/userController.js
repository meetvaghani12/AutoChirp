"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = await User_1.default.create({
            name,
            email,
            password
        });
        if (user) {
            const userResponse = {
                _id: String(user._id),
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(String(user._id))
            };
            res.status(201).json(userResponse);
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};
exports.registerUser = registerUser;
// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const userResponse = {
            _id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(String(user._id))
        };
        res.json(userResponse);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};
exports.loginUser = loginUser;
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userResponse = {
            _id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(String(user._id))
        };
        res.json(userResponse);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};
exports.getUserProfile = getUserProfile;
