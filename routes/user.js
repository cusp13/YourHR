const {Router} = require("express");
const User = require("../models/user")

const router = Router();

router.get("/signin",(req,res)=>{
    return res.render("signin");
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try{
       console.log(email.password);
       const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/"); 
    }  catch(err){
        res.render("signin", {
            error: "Incorrect email and password",
        })
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect('/');
})
router.post("/signup",async(req,res)=>{
    const  {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})



module.exports = router;