//Importing model User for use in sign in and sign up
const User = require('../models/user');

module.exports.profile = function(req, res){
    //first detect whether there is a cookie named user_id
    if(req.cookies.user_id)
    {
        //finding info of that user in the database through cookie 
        User.findById(req.cookies.user_id,function(err,user){
            if(err){console.log('error while finding user');return;}
            //if user is found in  database
            if(user)
            {
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                });
            }
            else{
                //user not found in database
                return res.redirect('/users/sign-in');
            }
        });
    }
    else
    {
        //no such cookie is present. This means someone has directly tried to access profile page without signing in. Some smart ass.
        return res.redirect('/users/sign-in');
    }

}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up.ejs',{
        title: "Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in.ejs',{
        title: "Sign In"
    });
}

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('Error in finding user in signing up');return;}
        
        if(!user)
        {
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating while signing up');}
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            return res.redirect('back');
        }
    });

}

//sign in and create a session for user
module.exports.createSession = function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }

        //handle user found
        if(user)
        {
            //handle the password which doesn't match
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            //handle user not found
            return res.redirect('back');
        }

    });
}