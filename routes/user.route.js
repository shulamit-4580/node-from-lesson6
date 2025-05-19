import { Router } from 'express';
// import express from 'express';
import { getAllUsers,signIn,signUp,updateUser } from '../controllers/user.controller.js';
import { checkAuth, checkAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

//הצגת כל המשתמשים
router.get('/',checkAuth,checkAdmin,getAllUsers)

//הרשמת משתמש חדש
router.post('/signUp', signUp)

//התחברות משתמש קיים
router.post('/signIn',signIn)

//עדכון משתמש לפי id
router.put('/:id',checkAuth,updateUser)

export default router;