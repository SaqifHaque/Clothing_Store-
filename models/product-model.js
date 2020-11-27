const db = require('./db');

module.exports = {

    getProductId: function(id, callback) {
        var sql = "select * from products where id= '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    getProducts: function(callback) {
        var sql = "select * from products";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    insert: function(user, callback) {
        var pic = "https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg";
        var sql = "insert into users VALUES ('', '" + user.username + "' , '" + user.email + "' ,'" + user.bloodgroup + "', '" + user.phone + "','" + user.password + "', '" + pic + "' ,'" + user.type + "' , '" + user.status + "','" + user.gender + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    update: function(user, callback) {
        // var sql = "update user set username = '" + user.username + "',password='" + user.password + "' , type='" + user.type + "' where id='" + user.id + "'";

        //console.log(sql);

        db.execute(sql, function(status) {
            callback(status);
        });

    },
    delete: function(id, callback) {
        // var sql = "delete from user where id = '" + id + "'";

        //console.log(sql);

        db.execute(sql, function(status) {
            callback(status);
        });
    },
}