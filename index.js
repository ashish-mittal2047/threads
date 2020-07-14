const express = require('express');
const app = express();
const port = 8000;


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);   //we have used back ticks here, instead of quotes. Dollar sign is used for evaluation of variable. This is called interpolation.
    }
    console.log(`Server is up and running on port: ${port}`);
});
