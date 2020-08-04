//Importing model User for use in sign in and sign up
const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: "Profile",
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){   //here, we find the User object with particular id and assign to it, the request body which has updated parameters
            return res.redirect('back');
        });
    }
    else{
        //if person viewing the profile isn't the owner of profile, then simply return back
        return res.status(401).send('Unauthorized'); 
    }
}


//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up.ejs',{
        title: "Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
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
    req.flash('success','Logged in successfully!');
    return res.redirect('/');
}

//this is the action taken on signing out
module.exports.destroySession = function(req,res){
    req.logout();   //this is inbuilt function in passport
    req.flash('success', 'Logged out successfully!');
    return res.redirect('/');
}