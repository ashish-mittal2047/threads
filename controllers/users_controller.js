//Importing model User for use in sign in and sign up
const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "Profile"
    });
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
    return res.redirect('/');
}