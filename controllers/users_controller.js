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
    //TODO later
}

//sign in and create a session for user
module.exports.createSession = function(req,res){
    //TODO later
}