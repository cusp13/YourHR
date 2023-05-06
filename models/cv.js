const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    resumeURL:{
        type: String,
        required: true,
    },
    createdBy:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user',
    },
},{
    timestamps: true,
})
const Cv = new mongoose.model("cv",cvSchema);

module.exports = Cv;
