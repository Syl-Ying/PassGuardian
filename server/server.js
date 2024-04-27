import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import RecordRoutes from './routes/recordRoute.js';
import {authentication} from './controllers/auth.js';

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/records', authentication, RecordRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - ${process.env.NODE_ENV}`);
})