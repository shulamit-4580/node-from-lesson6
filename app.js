import express from 'express';
import booksRoute from './routes/books.route.js';
import usersRoute from './routes/user.route.js';
import { addCurrentDate,printDate,isFriday } from './middlewares/addCurrentDate.middleware.js';
import { notFound,errorHandler } from './middlewares/errorHandling.middleware.js';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//מוסיף את התאריך הנוכחי לאובייקט הבקשה (req) של Express
app.use(addCurrentDate);

//מדפיס את התאריך הנוכחי לקונסולה
app.use(printDate);

//חוסם אם התאריך הנוכחי הוא שישי בין השעות 12 ל-22
app.use(isFriday);

app.get('/', (req, res) => {
    res.json('welcome to our website');
});

app.use('/books', booksRoute);

app.use('/users', usersRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(5000,() => {
    console.log('server is running on port 5000');
});