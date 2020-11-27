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
    var sum = 0;
    cartModel.getCart(req.cookies["Id"], function(results) {
        for (var i = 0; i < results.length; i++) {
            sum += parseInt(results[i].price);
            if (i == results.length - 1) {
                res.render('user/cart', { carts: results, sum: sum, total: (sum + (sum * .15)), tax: (sum * .15) });
            }
        }
    })
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
                const inv = {
                    products: products,
                    total: req.params.str.toString(),
                    card: req.body.card,
                    date: curday('/'),
                    u_Id: req.cookies["Id"]
                }
                cartModel.invoice(inv, function(status) {
                    if (status) {
                        res.redirect('/invoice');
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
            res.redirect("userdash/cart");
        }

    })
})






module.exports = router;