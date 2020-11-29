const db = require('./db');

module.exports = {

    getProductByCategory: function(str, callback) {
        var sql = "select * from products JOIN category on products.c_Id = category.c_Id where category.c_name= '" + str + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    getProducts: function(callback) {
        var sql = "select * from products join category on products.c_Id = category.c_Id";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    getCategories: function(callback) {
        var sql = "select * from category";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    update: function(status, id, callback) {
        var sql = "update orders set ostatus = '" + status + "' where o_Id='" + id + "'";

        db.execute(sql, function(status) {
            callback(status);
        });

    },

    getOrders: function(callback) {
        var sql = "select * from orders join users on orders.u_Id = users.id";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    insert: function(product, callback) {
        var sql = "insert into products VALUES ('', '" + product.p_name + "' , '" + product.price + "' ,'" + product.size + "', '" + product.p_description + "', '" + product.p_image + "', '" + product.c_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    delete: function(id, callback) {
        var sql = "delete from products where p_Id = '" + id + "'";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
}