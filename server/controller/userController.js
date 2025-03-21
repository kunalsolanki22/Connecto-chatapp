const User = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req,res,next) => {
    console.log(req.body)
    try{
        const {username,email,password} = req.body
    
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.json({msg:"Username already used", status:false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg:"Email already used", status:false});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password:hashedPassword,
        })
        delete user.password;

        return res.json({status:true,user})
    }
    catch(err){
        next(err)
    }
}; 


module.exports.login = async (req,res,next) => {
    console.log(req.body)
    try{
        const {username,password} = req.body
    
        const user = await User.findOne({username});
        if(!user){
            return res.json({msg:"Incorect Username or Password", status:false});
        }
        const isPasswordVaild = await bcrypt.compare(password,user.password);
        if(!isPasswordVaild){
            return res.json({msg:"Incorect Username or Password", status:false});
        } 
        delete user.password;

        return res.json({status:true,user})
    }
    catch(err){
        next(err)
    }
}; 

module.exports.setAvatar = async (req,res,next) => {
    console.log(req.body)
    try{
        const userId = req.params.id
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        if (userData) {
            return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
        } else {
            return res.status(400).json({ msg: "Failed to update avatar" });
        }
    }
    catch(err){
        next(err)
    }
}

module.exports.getAllUsers = async (req,res,next) => {
    try{
        const users = await User.find({_id : {$ne:req.params.id} }).select([
            "email",
            "username",
            "_id",
            "avatarImage",
        ]) //{_id : {$ne:req.params.id} } will select all the users except the one we are logged in
        return res.json(users)
    }
    catch(err){
        next(err)
    }
};