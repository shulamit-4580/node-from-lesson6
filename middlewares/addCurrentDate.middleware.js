//8
// מוסיף את התאריך הנוכחי לאובייקט הבקשה (req) של Express
export const addCurrentDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
};

//מדפיס את התאריך הנוכחי לקונסולה
export const printDate = (req, res, next) => {
    if(req.method === 'GET') {
        console.log(req.currentDate.toLocaleString());
    }
    next();
}

// בודק אם התאריך הנוכחי הוא יום שישי
export const isFriday = (req, res, next) => {
    if(req.currentDate.getDay() === 5 && req.currentDate.getHours() >= 12 ||
     req.currentDate.getDay()==6 && req.currentDate.getHours() <= 22)
    {
        return res.status(418).json({ message: 'block by me!!!!!!' });
    }
    next();
}