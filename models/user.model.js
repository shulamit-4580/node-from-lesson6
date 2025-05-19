import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(this.password, salt);
    this.password = hash;
});

export const generateToken = (user) => {
    const secretKey=process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
        expiresIn: '5h',
    });
    return token;
}

export default model('User', userSchema);