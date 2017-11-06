const express = require('express');
const app = express();
app.listen(3000,function(){
    console.log("Aur bete");
});
require('./route/routes.js')(app);