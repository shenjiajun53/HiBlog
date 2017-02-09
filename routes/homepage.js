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

        let dealSignUp = new DealSignUp(user.userName, user.pass, user.userIntro);
        dealSignUp.restoreUser().then(
            () => {
                console.log("user save success 2222");
                // res.redirect('http://localhost:5006/users/shenjiajun');
                res.send({redirect: "/"});
            }
        ).catch((e) => {
            console.error(e);
        });
    }
);

router.get('/', function (req, res) {
    console.log("homepage on render");
    res.render('index');
});


module.exports = router;