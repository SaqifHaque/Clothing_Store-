const express = require('express');
const userModel = require.main.require('./models/crud-model');
const productModel = require.main.require('./models/product-model');
const router = express.Router();
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const { RSA_PKCS1_OAEP_PADDING } = require('constants');

router.get('/', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        res.render('admin/admindash');
    } else {
        res.redirect('/login');
    }
})
router.get('/navbar', (req, res) => {
    res.render('shared/adminnav', { name: req.cookies["uname"] });
})
router.get('/notice', (req, res) => {
    noticeModel.getNotice(function(results) {
        console.log(results);
        res.send(JSON.stringify(results));
    })

})
router.get('/usertable', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        userModel.getAll(function(results) {
            var users = results.filter(obj => obj.email != req.cookies["email"]);
            res.render('admin/usertable', { users: users });
        })
    } else {
        res.redirect('/login');
    }

})
router.post('/delete/:id', (req, res) => {
    userModel.delete(req.params.id, function(status) {
        if (status) {
            res.redirect("../usertable");
        }
    })


})
router.post('/deletepro/:id', (req, res) => {
    console.log(req.params.id);
    productModel.delete(req.params.id, function(status) {
        if (status) {
            res.redirect("../protable");
        } else {
            console.log("Server Error");
        }
    })


})
router.get('/adduser', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        res.render('admin/adduser');
    } else {
        res.redirect('/login');
    }

})
router.post('/adduser', [check('username', 'Invalid Username')
    .exists()
    .isLength({ min: 4 }),
    check('email', 'Invalid Email')
    .exists()
    .isEmail(),
    check('bloodgroup', 'Invalid bloodgroup')
    .exists()
    .isLength({ min: 2 }),
    check('phone', 'Invalid Phone')
    .exists()
    .isLength({ min: 15 })
    .isLength({ max: 15 }),
    check("password", "invalid password")
    .exists()
    .isLength({ min: 4 }),
    check("confirmpass", "Doesnt Match with password")
    .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error("Passwords don't match");
        } else {
            return val;
        }
    }),
    check("gender", "invalid gender")
    .exists()
    .isLength({ min: 2 })
], (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("validation failed");
            const alert = errors.array();
            alert.forEach(myFunction);

            function myFunction(item) {
                console.log(item);
            }
        } else {
            var user = {
                username: req.body.username,
                email: req.body.email,
                bloodgroup: req.body.bloodgroup,
                phone: req.body.phone,
                password: Buffer.from(req.body.password).toString('base64'),
                profilepic: "...",
                type: "User",
                status: "Verified",
                gender: req.body.gender
            };

            userModel.insert(user, function(status) {
                if (status) {
                    res.redirect("usertable")

                } else {
                    console.log("server failure");
                }
            })
        }
    } else {
        res.redirect('/login');
    }

})
router.get('/protable', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        productModel.getProducts(function(results) {
            res.render('admin/protable', { products: results });
        })
    } else {
        res.redirect('/login');
    }

})
router.get('/addpro', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        productModel.getCategories(function(results) {
            res.render('admin/addpro', { category: results });
        })
    } else {
        res.redirect('/login');
    }

})
router.post('/addpro', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        var product = {
            p_name: req.body.p_name,
            price: req.body.price,
            size: req.body.size,
            p_description: req.body.p_description,
            p_image: "",
            c_Id: req.body.category
        }
        console.log(product);
        productModel.insert(product, function(status) {
            if (status) {
                res.redirect("protable");
            } else {
                console.log("Server Error");
            }
        })
    } else {
        res.redirect('/login');
    }

})
router.get('/orders', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        productModel.getOrders(function(results) {
            res.render('admin/orders', { orders: results });
        })
    } else {
        res.redirect('/login');
    }

})
router.post('/ostatus/:str/:id', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Admin") {
        productModel.update(req.params.str, req.params.id, function(status) {
            if (status) {
                res.redirect("../../orders");
            } else {
                console.log("server error");
            }
        })
    } else {
        res.redirect('/login');
    }

})


module.exports = router;