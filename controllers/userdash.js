const express = require('express');
const userModel = require.main.require('./models/crud-model');
const productModel = require.main.require('./models/product-model');
const noticeModel = require.main.require('./models/notice-model');
const router = express.Router();
const fs = require('fs');
const { check, validationResult } = require('express-validator');
var msg = "";

router.get('/', (req, res) => {

    productModel.getProducts(function(results) {
        res.render('user/userdash', { Products: results });
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
        res.render('user/showproduct', { Products: results });
    })

})
router.get('/search/:str', (req, res) => {

    productModel.getProducts(function(results) {
        console.log(results);
        var result = results.filter(obj => obj.p_name.toLowerCase().includes(req.params.str.toLowerCase()));
        res.render('user/search', { Products: result });
    })

})

module.exports = router;