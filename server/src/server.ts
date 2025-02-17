import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', routes);  // This will handle all routes including user routes

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});