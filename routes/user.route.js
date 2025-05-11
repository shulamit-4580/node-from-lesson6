import { Router } from 'express';
// import express from 'express';
import { getAllUsers,signIn,signUp } from '../controllers/user.controller.js';

const router = Router();

//הצגת כל המשתמשים
router.get('/',getAllUsers)

//הרשמת משתמש חדש
router.post('/sign up', signUp)

//התחברות משתמש קיים
router.post('/sign in',signIn)

export default router;