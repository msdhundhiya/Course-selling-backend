const express = require("express");
const userRoute= express.Router();
const zod = require('zod');
const {userModel, purchaseModel} = require('../db');
require('dotenv').config();
const {middleware} = require('../middleware/middleware');

userRoute.post("/signup", async function(res,req){
    const requirebody = zod.object({
        email : zod.min(5).max(50).email(),
        password : zod.string().min(8).max(50).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        firstname: zod.string().min(3).max(100),
        lastname: zod.string().min(3).max(100)
    });
    const parseddata = requirebody.safeParse(req.body);
    if(!parseddata.success){
        return res.json({
            message: "incorrect data format",
            error: parseddata.error
        })
    }
    const {email,password,firstname,lastname} = req.body;
    const hashedpass = await bcrypt.hash(password,6);
    let errorthrown = false;
    try {
        await userModel.create({
            email: email,
            password: hashedpass,
            firstname: firstname,
            lastname: lastname
        });
    } catch (error) {
        errorthrown = true ;
        return res.json({
            message: "User already exists!",
        });
        
    }
    if (!errorthrown){
        res.json({
        message: "you are signed up"
        });
    }
});

userRoute.post("/login",async function(req,res){
    const {email, password} = req.body;
    const user = await userModel.findOne({
        email
    });

    console.log(user);
    const passwordmatch = await bcrypt.compare(password,user.password);
    if(passwordmatch){
        const token = jwt.sign({
            id: user._id
        },JWT_SEC_USER);
        res.json({
            token
        });
    }else{
        res.status(403).json({
            message: "invalid credentials"
        });
    }
});
userRoute.get("/purchases",middleware(process.env.JWT_SEC_USER),async function(res,req){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });
    
    res.json({
        purchases        
    })
});
module.exports = {
    userRoute
};

