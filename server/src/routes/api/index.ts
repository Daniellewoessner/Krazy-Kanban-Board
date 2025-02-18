import { Router, Request, Response, NextFunction } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

// Add logging middleware
router.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Add a test route at the API root
router.get('/', (_req, res) => {
  res.json({ message: 'API routes working' });
});

// Mount sub-routers
router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

// Catch-all error handler
router.use((err: { message: any; }, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default router;