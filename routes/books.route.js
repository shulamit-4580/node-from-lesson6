import { Router } from 'express';
// import express from 'express';
// import books from '../books.js';
import { addBook,deleteBook,getAllBooks,getBookById,updateBook } from '../controllers/book.controller.js';

const router = Router();

//קבלת כל הספרים
router.get('/', getAllBooks)

//קבלת ספר לפי id
router.get('/:id', getBookById)

//הוספת ספר חדש
router.post('/', addBook)

//עדכון ספר לפי id
router.put('/:id', updateBook)

//מחיקת ספר לפי id
router.delete('/:id', deleteBook)

export default router;