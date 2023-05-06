const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const Cv = require('./models/cv');
const { checkForAuthenticationCookie } = require("./middleware/auth");


const app = express();
// routers
const userRoutes = require("./routes/user");
const cvRoutes = require("./routes/cv");
// setting up view engines
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

const PORT = 9000;
// connecting mongodb
mongoose.connect("mongodb://127.0.0.1:27017/YourHR").then((e)=>{
    console.log("MongoDb Connected");
}).catch((err)=>{
    console.log(err);
})
// middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));
// routes
app.get("/",async(req,res)=>{
    const allcvs = await Cv.find({});
    res.render("home",{
       user: req.user,  
       cvs: allcvs,
    });
});
// adding path to middleare
app.use("/user",userRoutes) ;
app.use("/cv",cvRoutes) ;
// server
app.listen(PORT,()=>{
    console.log(`Sever is connected`);
})