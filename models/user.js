/**
 * Created by HUANGCH4 on 2015/7/30.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user');
var user = mongoose.model('User',userSchema);



module.exports = user;