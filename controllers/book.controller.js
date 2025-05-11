import Books  from '../models/book.model.js';

let booksList = [];

//קבלת כל הספרים
export const getAllBooks = async (req, res,next) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (error) {
        next({ message: error.message });
    }
};

//קבלת ספר לפי id
export const getBookById = async (req, res, next) => {
    try {
        const {id}=req.params;
        const book = await Books.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        next({ message: error.message });
    }
};

//הוספת ספר חדש
export const addBook = async (req, res,next) => {
    try{
    const {name,price, categories, writer } = req.body;
    const newBook = new Books({ name: name, price, categories, writer });
    await newBook.save();
    res.status(201).json(newBook);
    }
    catch (error) {
        next({ message: error.message });
    }
};

//עדכון ספר לפי id
export const updateBook=async (req, res,next) => {
    try{
        const {id}=req.params;
        const {_id,name,price, categories, writer } = req.body;
        
        if (id!== _id) {
            return next({ status: 409, message: 'id conflict' });
        }
        const updatedBook = await Books.findByIdAndUpdate(id, {
            $set:{name, price, categories, writer} ,
         }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        next({ message: error.message });
    }
}

//מחיקת ספר לפי id
export const deleteBook=async (req, res,next) => {
    try{
    const {id}=req.params;
    await Books.findByIdAndDelete(id);
    res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
};

