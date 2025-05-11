import mongoose from "mongoose";

export const connectDB = async () => {
    const DB_URI =process.env.DB_URI || 'mongodb://127.0.0.1/BookDB';
    try{
        await mongoose.connect(DB_URI);
        console.log(`Mongo Connect to ${DB_URI}`);
    }catch (error) {
        console.log('Mongo Error', error.message);
        process.exit();
    }
}