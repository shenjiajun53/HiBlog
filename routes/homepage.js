/**
 * Created by shenjj on 2017/1/23.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("homepage on render");
    res.render('index');
});

module.exports = router;