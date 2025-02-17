import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
const router = Router();
// Add logging middleware
router.use((req, _res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});
router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
// Catch-all error handler
router.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: 'An unexpected error occurred',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
export default router;
