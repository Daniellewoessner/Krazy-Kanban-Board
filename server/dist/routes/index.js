import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Public authentication routes (login, register)
router.use('/auth', authRoutes);
// Protected API routes - all routes under /api will require authentication
router.use('/api', authenticateToken, apiRoutes);
export default router;
