const Post = require('../models/post');
const Comment = require('../models/comment');

//this method Post.create creates a schema object with contents from request body that is coming from form content and its user
//still the post form is visible to even an unsigned user, so we need to modify it
//although below code has just one level of callback(not nested), so there is no need for aysnc await but we still do it to understand
// module.exports.create = function(req,res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     });
// }



module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post published!');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }   
    //Note: try catch is not compulsory but it is usually good to catch errors just as we do in callback
}


// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id, function(err, post){
//         //.id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();
//             //becoz only the user who made the post should be allowed to delete it and also the same user should be logged in
//             //also we need to remove all comments associated with the post
//             Comment.deleteMany({post: req.params.id},function(err){
//                 if(err){console.log('Error');}
//                 return res.redirect('back');
//             });
//         }
//         else{
//             //if signed-in user doesn't match with the one who wrote the post, then return back
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function(req,res){
    let post = await Post.findById(req.params.id);
    try
    {
        if(post.user == req.user.id){
            post.remove();
            //becoz only the user who made the post should be allowed to delete it and also the same user should be logged in
            //also we need to remove all comments associated with the post
            await Comment.deleteMany({post: req.params.id});
            req.flash('success','Post and associated comments deleted!');
            return res.redirect('back');
        }
        else{
            //if signed-in user doesn't match with the one who wrote the post, then return back
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
    
}