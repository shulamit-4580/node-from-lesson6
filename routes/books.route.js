import express from 'express';
import books from '../books';

const router = express.Router();

//קבלת כל הספרים
router.get('/', (req, res) => {
    res.json(books);
})

//קבלת ספר לפי id
router.get('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
})

//הוספת ספר חדש
router.post('/', (req, res) => {
    const {newBook}= req.body;
    books.push(newBook);
    res.status(201).json(newBook);
})

//עדכון ספר לפי id
router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const {book}=req.body;
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex].id = book.id;
        books[bookIndex].name = book.name;
        books[bookIndex].price = book.price;
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
})

//מחיקת ספר לפי id
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
})

export default router;