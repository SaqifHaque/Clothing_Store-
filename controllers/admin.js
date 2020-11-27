const express = require('express');
const userModel = require.main.require('./models/crud-model');
const productModel = require.main.require('./models/product-model');
const router = express.Router();
const fs = require('fs');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('admin/admindash');
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

module.exports = router;