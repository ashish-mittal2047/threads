const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));       //we have directly written require here, instead of storing require in a variable and then writing.We also don't need to mention index.js in routes as it is picked by default


//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');             //instead of using path.join and __dirname, we write relative path directly
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);   //we have used back ticks here, instead of quotes. Dollar sign is used for evaluation of variable. This is called interpolation.
    }
    console.log(`Server is up and running on port: ${port}`);
});
