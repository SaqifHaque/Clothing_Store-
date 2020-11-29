const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();
// const jwt = require("jsonwebtoken");
let msg = "";

router.get('/', (req, res) => {
    if (req.cookies["cred"] != null) {
        res.redirect("/userdash");
    } else {
        res.render('index/login', { msg: msg });
    }
})
router.post('/', (req, res) => {

    var user = {
        email: req.body.email,
        password: Buffer.from(req.body.password).toString('base64')
    };
    console.log(user.password);
    userModel.validate(user, function(status) {
        if (status) {
            msg = "";
            var secret = Buffer.from(user.email + ":" + user.password).toString('base64');
            res.cookie('cred', secret);
            userModel.getByEmail(user.email, function(results) {
                res.cookie('uname', results[0].username);
                res.cookie('type', results[0].type);
                res.cookie('Id', results[0].id);
                res.cookie('status', results[0].status);
                res.cookie('email', results[0].email);
                if (results[0].status != "Unverified") {
                    if (results[0].type == "Admin") {
                        res.redirect('/admin');
                    } else if (results[0].type == "User") {
                        res.redirect('/userdash');
                    }
                } else {
                    msg = "Unauthorized";
                    res.render('index/login', { msg: msg });
                }
            })
        } else {
            msg = "Unauthorized";
            res.render('index/login', { msg: msg });
            console.log("Failed");
        }
    });
})
module.exports = router;