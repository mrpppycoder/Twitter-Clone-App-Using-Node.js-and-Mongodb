const express = require("express");
const bodyParse = require("body-parser");
const path = require('path');

const mongoose = require("mongoose");
const userController = require('./Controllers/user.controllers');
const postController = require('./Controllers/post.controllers');

const cors = require('cors');

const port = process.env.PORT || 3000

const app = express();
const server = require('http').createServer(app)
const io = require("socket.io")(server, { cors: { origin: "*" }, allowEIO3: true });

mongoose.connect("mongodb://localhost:27017/twitterApp")
.then(() => console.log(`connection sucessfully to databas`));

io.on("connection",(socket)=>{
    socket.on('loginreg', async (params, callback) => {
        console.log(params)

        var data = await userController.registerOrLogin(params.username, params.password);
        socket.emit("loginres",{
            msg:"login sucessfully",
            data:data
        })
    })


socket.on('createNewPost',async(params, callback) =>{
    console.log(params)
    var data = await postController.createNewPost(params);
    socket.emit("createNewPostRes", {msg:"Post Created Sucessfully", data:data})
})

socket.on('getAllPost',async(params, callback) =>{
    var data = await postController.getAllPost();
    socket.emit("getAllPostRes", {msg:"All Post List retrived Successfully", data:data})
})
socket.on('Comment',async(params, callback)=>{
    var data=await postController.Comment(params.comments, params.postId);
    socket.emit("CommentRes",{
        msg:"comment sucessfully...!",
        data:data
    })
   
})
socket.on('Like',async(params,callback)=>{
    var data=await postController.Like(params.likes, params.postId);
    socket.emit("like",{
        msg:"you Liked sucessfully",
        data:data
    })
   
})
});

server.listen(port, ()=>{
    console.log(`server is running on port ${port}.`);
})