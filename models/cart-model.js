const db = require('./db');

module.exports = {

    getNotice: function(id, callback) {
        var sql = "select * from carts JOIN products on carts.cart_Id = products.p_Id where carts.u_Id= '" + id + "'";;
        db.getResults(sql, function(results) {
            callback(results);
        });

    }
}