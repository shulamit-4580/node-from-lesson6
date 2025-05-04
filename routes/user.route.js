import express from 'express';
import users from '../users.js';
import router from './books.route.js';

router.get('/', (req, res) => {
    res.json(users);
})

//הרשמת משתמש חדש
router.post('/sign up', (req, res) => {
    const {newUser}= req.body;
    users.push(newUser);
    res.status(201).json(newUser);
})

//התחברות משתמש קיים
router.post('/sign in', (req, res) => {
    const {userEnter}= req.body;
    const user = users.find(u => u.name === userEnter.name && u.pass === userEnter.pass);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})

export default router;