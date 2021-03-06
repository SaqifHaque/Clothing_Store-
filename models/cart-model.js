const db = require('./db');

module.exports = {

    getCart: function(id, callback) {
        var sql = "select * from carts JOIN products on carts.p_Id = products.p_Id where carts.u_Id= '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    addCart: function(id1, id2, callback) {
        var sql = "insert into carts VALUES ('', '" + id1 + "' , '" + id2 + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    purchase: function(order, callback) {
        var sql = "insert into orders VALUES ('', '" + order.products + "' , '" + order.total + "', '" + order.status + "', '" + order.u_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    invoice: function(inv, callback) {
        var sql = "insert into invoice VALUES ('', '" + inv.products + "' , '" + inv.total + "', '" + inv.card + "', '" + inv.date + "', '" + inv.u_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    getInvoice: function(id, callback) {
        var sql = "select * from invoice where u_Id= '" + id + "'";;
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    deleteCart: function(id, callback) {
        var sql = "delete from carts where cart_Id= '" + id + "'";
        db.execute(sql, function(status) {
            callback(status);
        });

    },
}