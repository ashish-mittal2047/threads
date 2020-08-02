const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req,res){      //we write async here so that we can use async await syntax
    
    // Post.find({},function(err, posts){
    //     return res.render('home',{
    //         title: "Threads | Home",
    //         posts: posts
    //     });

    // });
    //Commented code above this line is worthless.
    //Instead of simply using this, we pre-populate user so that we can display name and other info of author instead of objectId 
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){             

    //     User.find({},function(err,users){
    //         return res.render('home',{
    //             title: "Threads | Home",
    //             posts: posts,
    //             all_users: users
    //         });
    //     });
        
    // });
    //We use async await to present our above code in a cleaner format
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await User.find({}); //await is used to synchronize asynchonous calls so that they happen only after each other in a specific order
        //async await is much better as compared to using callbacks and promises.
        return res.render('home',{
            title: "Threads | Home",
            posts: posts,
            all_users: users
        });

    }catch(err){
        console.log('Error',err);
        return;
    }
}