const Comment = require('../models/comment');
const Post = require('../models/post');

//Note: req.body.post gives the data sent by input field with name 'post' in the comment form
// Similarly, req.body.content
module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(post)
        {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err)
                {
                    console.log('Error');
                    return;
                }
                post.comments.push(comment);    //here, it is modified only on server
                post.save();    //this permanentl modifies comment array by modifying in database
            
                res.redirect('/');
            });
        }
    });
}