import express from 'express';
import booksRoute from './routes/books.route.js';
import usersRoute from './routes/user.route.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json('welcome to our website');
});

app.use('/books', booksRoute);
app.use('/users', usersRoute);

app.listen(5000,() => {
    console.log('server is running on port 5000');
});