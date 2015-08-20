var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session')
var ejs = require('ejs');
var app = express();
var port = 8888;
var _ = require('underscore');
var user = require('./routes/user');
var index = require('./routes/index');
//var filter = require('./filter/LoginFilter')

mongoose.connect('mongodb://localhost:27017/test');

app.set('views', './views/pages');

app.set('view engine', 'ejs');

//app.engine('.html', ejs.__express);
//app.set('view engine', 'html')

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname)));

console.log("server started on port "+port);

app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'uwotm8' }));
//console.log(session);

app.listen(port);

app.use('/',index);

app.use('/user',user);

//app.use(function(req,res,next){
//    if(!req.session.user_id){
//        res.redirect('/');
//    }
//    else{
//        next();
//    }
//
//});
