import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT || 8000;
const app = express();

// connect to db
mongoose.connect(process.env.MONGO_URI, {})
        .then(() => console.log("DB connected"))
        .catch((err) => console.log("DB Error => ", err));

// middlewares
app.use(morgan('dev'));
if (process.env.NODE_ENV = 'development') {
    app.use(cors({ origin: `http://localhost:5173` }));
}
app.use(bodyParser.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - ${process.env.NODE_ENV}`);
})