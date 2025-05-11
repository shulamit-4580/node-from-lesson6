import {model, Schema} from 'mongoose';

const bookSchema = new Schema({
    name: String,
    price: Number,
    categories:[String],
    writer:{
        name:String,
        phone:String,
        mail:String
    }
})

export default model('Books', bookSchema);