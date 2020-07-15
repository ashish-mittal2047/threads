module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "Profile"
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up.ejs',{
        title: "Sign Up"
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in.ejs',{
        title: "Sign In"
    });
}
