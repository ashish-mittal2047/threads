const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);   //this requires argument session as we need to store session info in MongoDB so that every time server restarts, users don't get signed out
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));          //we instruct program to use this middleware before server starts so that these files are precompiled

//for reading POST requests
app.use(express.urlencoded());

//using cookie parser
app.use(cookieParser());

//for accessing static files
app.use(express.static('./assets'));

//Instructing to use ejs layout library. This should be before defining router so that router accesses views accordingly
app.use(expressLayouts);

//Extract styles and scripts from sub pages into the layout. These override default layout style and script so that individual style and scripts can be given.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');             //instead of using path.join and __dirname, we write relative path directly

//mongo store is used to store session cookie in database
app.use(session({
    name: 'threads',
    //TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (1000 * 60 * 100) // in milliseconds
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'  
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');   //this displays error if it occurs otherwise prints the string connect-mongo setup ok 
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Now becoz flash message uses session cookie so we place it after passport session is setup and before router
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));       //we have directly written require here, instead of storing require in a variable and then writing.We also don't need to mention index.js in routes as it is picked by default

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);   //we have used back ticks here, instead of quotes. Dollar sign is used for evaluation of variable. This is called interpolation.
    }
    console.log(`Server is up and running on port: ${port}`);
});
