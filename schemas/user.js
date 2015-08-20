/**
 * Created by HUANGCH4 on 2015/7/30.
 */
var mongooes =  require('mongoose');
var userSchema = new mongooes.Schema({
    username: String,
    password: String,
    useremail: String
});

//userSchema.findByUserName =
//    function(username){
//        console.log("findByUserName1");
//        console.log(this.findOne({'username':username}));
//        return this.findOne({'username':username});
//    };
//
//userSchema.findByEmail =
//    function(useremail){
//        return this.findOne({'userEmail':useremail});
//    };

userSchema.statics = {
    findByUserName : function(username,cb){
        console.log("findByUserName");
        this.findOne({'username':username}).exec(cb);
    },
    findByEmail : function(useremail,cb){
         console.log("findByUserEmail");
         this.findOne({'useremail':useremail}).exec(cb);
    }
}
module.exports = userSchema;