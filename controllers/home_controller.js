const Post = require('../models/post');

module.exports.home = function(req,res){
    
    // Post.find({},function(err, posts){
    //     return res.render('home',{
    //         title: "Threads | Home",
    //         posts: posts
    //     });

    // });
    //Instead of simply using this, we pre-populate user so that we can display name and other info of author instead of objectId 
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home',{
            title: "Threads | Home",
            posts: posts
        });
    });
    
}