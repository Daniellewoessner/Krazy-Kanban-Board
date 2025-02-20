import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public auth routes MUST be registered first
router.use('/api/auth', authRoutes);  // This handles /api/auth/login

// Then protected API routes
router.use('/api', (req, _res, next) => {
    // Skip authentication for auth routes
    if (req.path.startsWith('/auth/')) {
        return next('route');
    }
    // Apply authentication for all other /api routes
    authenticateToken(req, _res, next);
}, apiRoutes);

export default router;