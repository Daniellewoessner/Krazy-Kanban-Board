import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Debug middleware - add this first
app.use((req, _res, next) => {
    console.log(`DEBUG: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://krazy-kanban-board2.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
// Root test route
app.get('/', (_req, res) => {
    res.json({ message: 'Server is running' });
});
// Direct test route for API
app.get('/api-test', (_req, res) => {
    res.json({ message: 'Direct API test route' });
});
// Mount all routes
app.use('/', routes);
// Add static file serving like in the working file
app.use(express.static("../client/dist"));
// Final error handler
app.use((err, req, res, _next) => {
    console.error('Error:', {
        method: req.method,
        path: req.url,
        error: err.message
    });
    res.status(500).json({
        message: 'An unexpected error occurred',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed:', err);
});
