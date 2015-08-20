/**
 * Created by HUANGCH4 on 2015/8/7.
 */
exports.loginFilter = function(req,res,next){
    if(!req.session.user_id){
        res.redirect('/login');
    }
    else{
        next();
    }

};