import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import rootRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(express.json());

connectDB();

app.use('/api/v1', rootRouter);

app.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
