const {Router} = require("express");
const multer = require("multer");
const upload = multer({dest: "./public/uploads/"});
const path = require('path');
const Cv = require("../models/cv");

const router = Router();

const storage = multer.diskStorage({
   destination: function(req,file,cb){
    cb(null, path.resolve(`./public/uploads/${req.user._id}`));
   },
   filename: function(req,file,cb){
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null,fileName);
   }
});


router.get("/add-cv",(req,res)=>{
    return res.render("addcv",{
      user: res.user,
    });
});

router.post("/", upload.single("Resume"), async(req,res)=>{
  const {title,body} = req.body;
   const cv = await Cv.create({
    body,
    title,
    createdBy: req.user_id,
    resumeURL: `/uploads/${req.file.filename}`,
   });
    return res.redirect(`/`);
});


module.exports = router;