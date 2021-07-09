var{Post} = require("../models/post.model");
async function createNewPost(postObj){
    
    let postObjReq = postObj;
    return new Promise(async (resolve, reject)=>{
        var newPostObj = new Post(postObjReq);
        var postObjRes = await newPostObj.save();
        return resolve(postObjRes)
    });
}
async function getAllPost(){
    return new Promise(async (resolve, reject) =>{
        var postlist = await Post.find().populate('userId');
        return resolve(postlist)
    });
}
async function Comment(commentObj, postId){
    return new Promise(async(resolve, reject)=>{
        console.log("object",commentObj);
        Post.update(
            {_id: postId},
            {$push: {comments: commentObj}}).exec(async(err,Book)=>{
            var commentList =await Post.findById(postId).populate('userId').populate('comment.userId');
            return resolve(commentList)
            });
    });
};
async function Like(likeObj, postId){
    return new Promise(async(resolve, reject)=>{
        console.log("object",likeObj);
    Post.update(
            {_id:postId},
            {$push:{likes:likeObj}}).exec(async(err,pp)=>{
                var likelist =await Post.findById(postId).populate('userId').populate('likes.userId');
                return resolve(likelist)
            });
    });
};
module.exports = {
    createNewPost: createNewPost,
    getAllPost: getAllPost,
    Comment:Comment,
    Like: Like

}