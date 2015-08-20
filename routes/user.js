/**
 * Created by HUANGCH4 on 2015/8/4.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var filter = require('../filter/LoginFilter');

router.get('/check', function (req,res) {
   if(req.session.user_id){
       res.json(req.session.user_id)
   }
    else{
       res.json(false);
   }
});

router.post('/new',function(req,res){
    var userObj = req.body;
    console.log(userObj);
    var _user;
    //console.log("ssss"+User.findByUserName(userObj.username));
    User.findByUserName(userObj.username,function(err,user){
//        console.log("name:"+user);
        if(err)
            return console.log(err);
        if(user != null){
            console.log("User name already exists");
            res.json({errMsg:"User name already exists"});
            return;
        }
        User.findByEmail(userObj.useremail,function(err,user){
            console.log("email:"+user);
            if(err)
                return console.log(err);
            if(user != null){
//                console.log("User email already exists");
                res.json({errMsg:"User email already exists"});
                return;
            }
            _user = new User({
                username: userObj.username,
                password: userObj.password,
                useremail: userObj.useremail
            });

            _user.save(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("New user success");
                    res.json({success: true});
                }
            })
        });
    });
});

function checkUsername(err,user) {
//        console.log("name:"+user);
    if (err)
        return console.log(err);
    if (user != null) {
        console.log("User name already exists");
        res.json({errMsg: "User name already exists"});
        return;
    }
}

function checkUseremail(err,user){
    console.log("email:"+user);
    if(err)
        return console.log(err);
    if(user != null){
//                console.log("User email already exists");
        res.json({errMsg:"User email already exists"});
        return;
    }
}



router.post('/edit',function(req,res){
    var username = req.body.username;
    var useremail = req.body.useremail;
    var id = req.body.userid;
    console.log(req.url);
    console.log("userid: "+ id);
    console.log(req.body);
    User.update({_id:id}, {
        username:username,
        useremail:useremail
    }, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.json({success:true});
        }
    })
});

router.get('/delete/:id',function(req,res){
    console.log(req.url);
    var id = req.params.id;
    console.log("id: "+id);
    User.remove({_id:id},function(err){
        if(err){
            console.log(err);
        }else{
            res.json({success:true});
        }
    })
});

router.get('/getlist',function(req,res){
    console.log(req.url);
    User.find(function(err,userlist){
        if(err){
            console.log(err);
        }else{
//			console.log(userlist);
            res.json(userlist);
        }
    })
});

router.get('/edit/:id',function(req,res){
    console.log(req.url);
    var id = req.params.id;
    console.log("id: "+id);
    var user = User.findOne({"_id":id},function(err,user){
        if(err){
            console.log(err);
        }else{
            console.log(user);

            res.json(user)
        }
    })
});

router.post('/login',function(req,res){
    console.log(req.url);
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({$or:[{username:username},{useremail:username}]},function(err,user){
//    User.findOne({username:username},function(err,user){
        console.log("result: "+user);
        if(err){
            console.log(err);
        }
        if(user == null){
            console.log("User not Exist");
            res.json({errmsg:"User not Exist"});
            return;
        }
        if(password != user.password){
            console.log("Incorrect password");
            res.json({errmsg:"Incorrect password"});
            return;
        }
        req.session.user_id = user._id;
        console.log("session:"+req.session.user_id);
        res.json({
            success:true,
            user:{
                username:user.username,
                useremail:user.useremail,
                userid:user._id
            }
        });
    });
});

module.exports = router;