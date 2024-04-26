import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.js';
import recordRoutes from './routes/recordRoute.js';
import { authentication } from './validators/auth.js';

const PORT = process.env.PORT || 8000;
const app = express();

// connect to db
mongoose.connect(process.env.MONGO_URI, {})
        .then(() => console.log("DB Connected"))
        .catch((err) => console.log("DB Connection Error => ", err));

// middlewares
app.use(cors());
app.use(morgan('dev'));
if (process.env.NODE_ENV = 'development') {
    app.use(cors({ origin: `http://localhost:5173` }));
}
app.use(bodyParser.json());
app.use(cookieParser);
app.use('/api', authRoutes);
app.use('/api/records', authentication, recordRoutes);

let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - ${process.env.NODE_ENV}`);
})