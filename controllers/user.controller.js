import users from '../users.js';

//הצגת כל המשתמשים
export const getAllUsers = (req, res,next) => {
    res.json(users);
}
//הרשמת משתמש חדש
export const signUp = (req, res,next) => {
    const {newUser}= req.body;
    users.push(newUser);
    res.json(newUser);
}

//התחברות משתמש קיים
export const signIn= (req, res,next) => {
    const {userEnter}= req.body;
    let index = users.findIndex(u => u.name === userEnter.name && u.pass === userEnter.pass);
    if (index == -1) {
        res.json("user not found");
    } 
    else {
        res.json("connected succesfully");
    }
}