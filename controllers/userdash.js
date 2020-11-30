const express = require('express');
const userModel = require.main.require('./models/crud-model');
const cartModel = require.main.require('./models/cart-model');
const productModel = require.main.require('./models/product-model');
const noticeModel = require.main.require('./models/notice-model');
const router = express.Router();
const fs = require('fs');
const { check, validationResult } = require('express-validator');
var msg = "";

router.get('/', (req, res) => {

    productModel.getProducts(function(results) {
        res.render('user/userdash', { Products: results, cred: req.cookies["cred"] });
    })
})
router.get('/notice', (req, res) => {
    noticeModel.getNotice(function(results) {
        console.log(results);
        res.send(JSON.stringify(results));
    })

})
router.get('/notices', (req, res) => {

    noticeModel.getNotice(function(results) {
        res.render('user/notices', { notices: results });
    })
})
router.get('/navbar', (req, res) => {

    res.render('shared/navbar', { name: req.cookies["uname"] });

})
router.get('/showproduct/:str', (req, res) => {

    productModel.getProductByCategory(req.params.str, function(results) {
        console.log(results);
        res.render('user/showproduct', { Products: results, cred: req.cookies["cred"] });
    })

})
router.get('/search/:str', (req, res) => {

    productModel.getProducts(function(results) {
        console.log(results);
        var result = results.filter(obj => obj.p_name.toLowerCase().includes(req.params.str.toLowerCase()));
        res.render('user/search', { Products: result, cred: req.cookies["cred"] });
    })

})
router.get('/cart', (req, res) => {
    if (req.cookies["cred"]) {
        var sum = 0;
        cartModel.getCart(req.cookies["Id"], function(results) {
            console.log(results);
            if (results.length == 0) {
                res.render('user/cart', { carts: [], sum: 0, total: 0, tax: 0 });
            } else {
                for (var i = 0; i < results.length; i++) {
                    sum += parseInt(results[i].price);
                    if (i == results.length - 1) {
                        res.render('user/cart', { carts: results, sum: sum, total: (sum + (sum * .15)), tax: (sum * .15) });
                    }
                }
            }
        })
    } else {
        res.status(400);
    }
})
router.post('/add/:id', (req, res) => {
    cartModel.addCart(req.params.id, req.cookies["Id"], function(status) {
        if (status) {
            res.redirect('../cart');
        } else {
            console.log("Server Error");
        }
    })
})
router.post('/purchase/:str', (req, res) => {

    cartModel.getCart(req.cookies["Id"], function(results) {
        var products = "";
        for (var i = 0; i < results.length; i++) {
            products += results[i].p_name + "-";
        }
        const order = {
            products: products,
            total: req.params.str.toString(),
            status: "Pending",
            u_Id: req.cookies["Id"]
        }
        cartModel.purchase(order, function(status) {
            if (status) {
                var curday = function(sp) {
                    today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;
                    return (mm + sp + dd + sp + yyyy);
                };
                console.log(products);
                const inv = {
                    products: products,
                    total: req.params.str.toString(),
                    card: req.body.card,
                    date: curday('/'),
                    u_Id: req.cookies["Id"]
                }
                cartModel.invoice(inv, function(status) {
                    if (status) {
                        res.redirect('../invoice');
                    } else {
                        console.log("Server Error");
                    }
                })
            } else {
                console.log("Server Error");
            }
        })
    })
})
router.get('/invoice', (req, res) => {
    cartModel.getInvoice(req.cookies["Id"], function(results) {

        res.render("user/invoice", { invoices: results });

    })
})
router.post('/deletecart/:id', (req, res) => {
    cartModel.deleteCart(req.params.id, function(status) {
        if (status) {
            res.redirect("../cart");
        }

    })
})
router.get('/myprofile', (req, res) => {
    if (req.cookies["cred"] != null) {
        userModel.getById(req.cookies["Id"], function(result) {
            var c = Buffer.from(result[0].password, 'base64');
            const str = c.toString('utf-8');
            result[0].password = str.toString('ascii');

            res.render('user/myprofile', { user: result, msg: "" });
        })
    } else {
        res.redirect('/login');
    }

})
router.post('/myprofile', [
    check('username', 'Invalid UserName').exists().isLength({ min: 3 }),
    check('password', 'Invalid Password').exists().isLength({ min: 3 })

], (req, res) => {
    if (req.cookies["cred"] != null) {
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
                password: Buffer.from(req.body.password).toString('base64'),
                id: req.cookies["Id"]
            }
            console.log(user);
            userModel.myProfileUpdate(user, function(status) {
                if (status) {
                    res.redirect('myprofile');
                }
            })
        }
    } else {
        res.redirect('/login');
    }

})
router.post('/picupload', [
    check('dp', 'Invalid Profile Pic').custom((val, { req }) => {
        if (req.files.dp.mimetype === 'image/jpeg') {
            return true;
        } else {
            return false;
        }
    })
], (req, res) => {
    if (req.cookies["cred"] != null) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("validation failed");
            const alert = errors.array();
            alert.forEach(myFunction);

            function myFunction(item) {
                console.log(item);
            }
        } else {

            let fileName = req.files.dp;
            let uploadPath = 'assets/uploads/' + fileName.name;
            var user = {
                userid: req.cookies["Id"],
                uploadPath: uploadPath
            };
            userModel.uploadPicture(user, function(status) {
                if (status) {
                    fileName.mv(uploadPath, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                    });
                    res.redirect('myprofile');
                } else {
                    console.log("can not upload");
                }
            });
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/contact', (req, res) => {

    res.render('user/contact');

})
router.get('/autosearch', (req, res) => {
    productModel.getProducts(function(results) {
        console.log(results);
        res.send(JSON.stringify(results));
    })

})
module.exports = router;