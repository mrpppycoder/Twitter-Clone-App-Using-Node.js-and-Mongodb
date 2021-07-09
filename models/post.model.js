const mongoose = require("mongoose");
const Schema  =  mongoose.Schema;

const PostSchema = new  mongoose.Schema({

    userId: { type: Schema.Types.ObjectId, ref:"User"},
    post: {type: String, required:true},
    likes:[
        {
            User:{type:Schema.Types.ObjectId, ref:"User" }
        }],
    comments:[
        {
            comment:{type:String, required:true},
            User:{type:Schema.Types.ObjectId, ref:"User"}
        }
    ]
},
{timestamps:true }
);
const Post = mongoose.model("Post",PostSchema);
exports.Post = Post;