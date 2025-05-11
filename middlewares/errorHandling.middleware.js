//11
export const notFound = (req, res, next) => {
    // כאשר שולחים פרמטר לנקסט
    // עוברים אוטומטית למידלוואר של השגיאות
    next({ message: 'url not found!', status: 404 });
}

export const errorHandler = (err, req, res, next) => {
    const status = err.status ?? 500;
    const msg = err.message ?? 'Server Error';
    res.status(status).json({ error: msg }); 
};