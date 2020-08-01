const Post = require('../models/post');


//this method Post.create creates a schema object with contents from request body that is coming from form content and its user
//still the post form is visible to even an unsigned user, so we need to modify it
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}