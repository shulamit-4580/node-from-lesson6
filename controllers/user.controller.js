import bcrypt from 'bcryptjs';
import Users,{generateToken} from '../models/user.model.js'

//הצגת כל המשתמשים
export const getAllUsers =async (req, res,next) => {
    try {
        const users = await Users.find();
        res.json(users); 
    } catch (error) {
        next({ message: error.message });
    }
}

//הרשמת משתמש חדש
export const signUp =async (req, res,next) => {
    try{
        const {username,email,password}= req.body;
        const user=new Users({username,email,password})
        await user.save();
        const token=generateToken(user);
        res.json({username:user.username,token});
    }catch (error) {
        next({ message: error.message });
    }
}

//התחברות משתמש קיים
export const signIn=async (req, res,next) => {
    try{
        const {email,password}= req.body;
        const user=await Users.findOne({email});
        if (!user) {
            return next({ message: 'user not found',status:401 });
        }
        const isAuth= await bcrypt.compare(password, user.password);
        if (!isAuth) {
            return next({ message: 'user not found',status:401 });
        }
        const token=generateToken(user);
        res.json({username:user.username,token});
    }catch (error) {
        next({ message: error.message });
    }
}

//מחיקת משתמש לפי id
export const deleteUser=async (req, res,next) => {
    try{
        const {id}=req.params;
        if(req.myUser._id!==id){
            return next({ status: 403, message: `user ${req.myUser._id} cannot delete user ${id}` });
        }
        await Users.findByIdAndDelete(id);
        res.status(204).end();
    }catch (error) {
        next({ message: error.message });
    }
}

//עדכון משתמש לפי id
export const updateUser=async (req, res,next) => {
    try{
        const pId=req.params.id;
        const {_id,username,email,password,role}= req.body;
        if(pId!==_id){
            return next({ status: 409, message: 'id conflict' });
        }
        if(req.myUser._id!==pId){
            return next({ status: 403, message: `user ${req.myUser._id} cannot update user ${pId}` });
        }
        const user=await Users.findByIdAndUpdate(pId,{
            $set:{username,email,password,role}},{new:true});
        res.status(200).json(user);
    }catch (error) {
        next({ message: error.message });
    }
}
