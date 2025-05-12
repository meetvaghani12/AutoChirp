import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserProfile,
    setupTwoFactor,
    verifyTwoFactor,
    disableTwoFactor,
    verifyRegistration
} from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-registration', verifyRegistration);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.post('/2fa/setup', protect, setupTwoFactor);
router.post('/2fa/verify', protect, verifyTwoFactor);
router.post('/2fa/disable', protect, disableTwoFactor);

export default router; 