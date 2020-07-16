const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'username'
    },
    function(username, password, done){    //done is in-built argument
        //find a user and establish the identity
        User.findOne({email: username},function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            //if user is not found or password is wrong
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);    //this means although there is no error but authentication isn't still done
            }

            //if user is found
            return done(null,user);

        });
    }

));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing the user from the key in the cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null,user);
    });
});

module.exports = passport;