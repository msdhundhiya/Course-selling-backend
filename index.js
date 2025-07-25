const express = require('express');
const {userRoute} = require('./routes/user');
const {courseRoute} = require('./routes/course');
const {adminRoute} = require('./routes/admin');
require("dotenv").config();
app = express();
app.use(express.json())
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);
 
app.listen(3000);