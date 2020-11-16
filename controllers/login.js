const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login/index')
})

router.post('/', (req, res) => {

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    userModel.validate(user, function(status) {
        if (status) {
            res.cookie('email', req.body.email);
            userModel.getByEmail(user.email, function(results) {
                if (results[0].type == "Admin") {
                    // res.redirect('/registration');
                } else if (results[0].type == "Doctor") {
                    //res.redirect('/registration');
                } else if (results[0].type == "Patient") {
                    //res.redirect('/registration');
                } else if (results[0].type == "Receptionist") {
                    //res.redirect('/registration');
                }
            })
        } else {
            res.redirect('/login');
        }
    });

})

module.exports = router;