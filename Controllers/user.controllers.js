var { User } =require("../models/user.model");
async function registerOrLogin(username, password){
    return new Promise(async (resolve, reject)=>{
        var userObj = await User.findOne({ username: username, password:password});
        if(userObj){
            return resolve(userObj)
        }
        else{
            var newUserObj = new User({
                username:username,
                password:password
            });
            userObj = await newUserObj.save();
            return resolve(userObj)
        }
        });
    }
    module.exports ={
        registerOrLogin: registerOrLogin
    }