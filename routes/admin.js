const Router = require('express');
const jwt = require('jsonwebtoken');
express = require("express");
const adminRoute = Router();
const {adminModel, courseModel} = require("../db");
const zod = require('zod');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {middleware} = require('../middleware/middleware');
const course = require('./course');
adminRoute.post("/signup", async function(req,res){
    const requirebody = zod.object({
        email : zod.email(),
        password : zod.string().min(8).max(50).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        firstname: zod.string().min(3).max(100),
        lastname: zod.string().min(3).max(100)
    });
    const {email, password,firstname,lastname} = req.body;
    const parseddata = requirebody.safeParse(req.body);
    if(!parseddata.success){
        return res.json({
            message: "incorrect data format",
            error: parseddata.error
        })
    }

    const hashedpass = await bcrypt.hash(password,6);
    let errorthrown = false;
    try {
        await adminModel.create({
            email,
            password: hashedpass,
            firstname,
            lastname
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

adminRoute.post("/login",async function(req,res){
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email
    });

    console.log(admin);
    const passwordmatch = bcrypt.compare(password,admin.password);
    if(passwordmatch){
        const token = jwt.sign({
            id: admin._id
        },process.env.JWT_SEC_ADMIN);
        res.json({
            token
        });
    }else{
        res.status(403).json({
            message: "invalid credentials"
        });
    }
});
adminRoute.post("/course",middleware(process.env.JWT_SEC_ADMIN),async function(req,res){
    const adminId = req.userId;
    const {title,description , imageurl,price} = req.body;

    const course = await courseModel.create({
        title,description,imageurl,price,creatorId:adminId
    })
    res.json({
            message: "Course Created",
            courseId : course._id
        });
});
adminRoute.put("/course",middleware(process.env.JWT_SEC_ADMIN), async function(req,res){
    const adminId = req.userId;
    const {title,description , imageurl,price,courseId} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId, //filter which checks id matches to course id and creator id to adminid 
        creatorId:adminId
    },{
        title,description,imageurl,price
    });
    res.json({
            message: "Course updated successfully"
        })
});
adminRoute.get("/course/bulk",middleware(process.env.JWT_SEC_ADMIN),async function(req,res){
    const adminId = req.userId;
    const course = await courseModel.find ({
       creatorId:adminId
    });
    res.json({
            course
        })
});
module.exports ={
    adminRoute: adminRoute
}

