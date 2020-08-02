const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function(req,res){
    
    // Post.find({},function(err, posts){
    //     return res.render('home',{
    //         title: "Threads | Home",
    //         posts: posts
    //     });

    // });
    //Instead of simply using this, we pre-populate user so that we can display name and other info of author instead of objectId 
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({},function(err,users){
            return res.render('home',{
                title: "Threads | Home",
                posts: posts,
                all_users: users
            });
        });
        
    });
    
}