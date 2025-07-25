const {Schema, default: mongoose} = require("mongoose");
const ObjectId = mongoose.ObjectId; 
require("dotenv").config();
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};

connectToDB();
const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
});
const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
});
const courseSchema = new Schema({
    title :String,
    description :String,
    price : Number,
    imageurl: String,
    creatorId : ObjectId
});
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchases",purchaseSchema);

module.exports ={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}