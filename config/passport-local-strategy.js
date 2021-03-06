const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',  //as defined in schema
        passReqToCallback: true
    },
    function(req, email, password, done){    //done is in-built argument
        //find a user and establish the identity
        User.findOne({email: email},function(err, user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            //if user is not found or password is wrong
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);    //this means although there is no error but authentication isn't still done
            }

            //if user is found
            return done(null,user);

        });
    }

));

//serializing the user to decide which key is to be kept in the cookies. This sends the cookie to express-session which encrypts id and then this function stores it in session cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing the user from the key in the cookies. Here , the encrypted key is decrypted to know the object id of user and that id is further used to access info of that user in database
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null,user);
    });
});


//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is signed in, then pass on the request to next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
} 


module.exports = passport;