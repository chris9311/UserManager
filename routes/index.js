/**
 * Created by HUANGCH4 on 2015/8/4.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    console.log(req.url);
    res.render('/index.html');
});

module.exports = router;