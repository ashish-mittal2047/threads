const Comment = require('../models/comment');
const Post = require('../models/post');

//Note: req.body.post gives the data sent by input field with name 'post' in the comment form
// Similarly, req.body.content
// module.exports.create = function(req,res){
//     Post.findById(req.body.post, function(err,post){
//         if(post)
//         {
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 if(err)
//                 {
//                     console.log('Error');
//                     return;
//                 }
//                 post.comments.push(comment);    //here, it is modified only on server
//                 post.save();    //this permanently modifies comment array by modifying in database
            
//                 res.redirect('/');
//             });
//         }
//     });
// }

module.exports.create = async function(req,res){
    try
    {
        let post = await Post.findById(req.body.post);
        if(post)
        {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);    //here, it is modified only on server
            post.save();    //this permanently modifies comment array by modifying in database
            res.redirect('/');
        }
    }
    catch(err)
    {
        console.log('Error');
        return;
    }
}

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){
//             //here we store objectId of post to which comment belongs, before deleting comment so that we can go to that ppost and delete this comment's id from comment array in that post
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id }},function(err,post){ //here $pull is an update operation. It pulls out(deletes) all instances of a value that match a specified condition. Here condition is, a value with req.params.id in comments array
//                 return res.redirect('back')
//             });
//         }
//         else{
//             //if user isn't the one who created that comment, then he is not allowed to delete comment and thus redirected back
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function(req,res){
    try
    {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            //here we store objectId of post to which comment belongs, before deleting comment so that we can go to that ppost and delete this comment's id from comment array in that post
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id }});          //here $pull is an update operation. It pulls out(deletes) all instances of a value that match a specified condition. Here condition is, a value with req.params.id in comments array
            return res.redirect('back');
        }
        else{
            //if user isn't the one who created that comment, then he is not allowed to delete comment and thus redirected back
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error');
        return;
    }
}