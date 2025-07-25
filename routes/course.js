const {Router} =require('express');
const { courseModel, purchaseModel } = require('../db');

const courseRouter = Router();

courseRouter.get("/preview",async function(req,res){

    const courses = await courseModel.find({});
    res.json({ 
        courses
    });
});
courseRouter.get("/purchase",async function(req,res){
    const userId = req.userId;
    const courseId = req.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })
        res.json({
            message: "you have successfully purchased the course"
        });
});
module.exports = {
    courseRouter: courseRouter 
};