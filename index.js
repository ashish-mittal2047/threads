const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));       //we have directly written require here, instead of storing require in a variable and then writing.We also don't need to mention index.js in routes as it is picked by default

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);   //we have used back ticks here, instead of quotes. Dollar sign is used for evaluation of variable. This is called interpolation.
    }
    console.log(`Server is up and running on port: ${port}`);
});
