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
module.exports = router;