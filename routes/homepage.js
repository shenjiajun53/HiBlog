/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let DealSignUp = require("../server/DealSignUp");

let router = express.Router();

router.post("/SignUp",
    (req, res) => {
        console.log("on Receive " + req.body.userName);
        // console.log("on Receive " + JSON.parse(req.body));
        let user = req.body;
        res.send(user);
        let dealSignUp = new DealSignUp(user.userName, user.pass, user.userIntro);
        dealSignUp.restoreUser().then(
            () => {
                console.log("user save success 3333");
                return res.redirect('/SignIn');
            }
        );
    }
);

router.get('/', function (req, res) {
    console.log("homepage on render");
    res.render('index');
});


module.exports = router;