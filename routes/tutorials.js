var moment = require('moment');

/* GET all tutorials */
exports.list = function(req,res) {
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM tutorials_tbl',function(err,rows){
            if(err)
                console.log("Error selecting : %s ", err);
            res.render('tutorials', {page_title:"Tutorials - All", data:rows});
        });

    });
};

exports.add = function(req, res) {
    res.render('add_tutorial', {page_title: "Add New Tutorial"});
};

exports.edit = function(req, res) {
    var id = req.params.id;

    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM tutorials_tbl WHERE id = ?', [id], function(err,rows) {
            if(err)
                console.log("Error selecting : %s ", err);
            res.render('edit_tutorial', {
                page_title: "Edit Tutorial",
                data:rows,
                moment: moment
            });
        });
    });
};

exports.save = function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection) {
        var data = {
            tutorial_title: input.title,
            author_id: input.author_id,
            submission_date: input.submission_date
        };

        var query = connection.query("INSERT INTO tutorials_tbl SET ? ", data, function(err,rows){
            if(err)
                console.log("Error inserting : %s ", err);
            res.redirect('/tutorials');
        });
        console.log(query.sql);
    });
};

exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function(err,connection) {
        var data = {
           tutorial_title: input.title,
           author_id: input.author_id,
           submission_date: input.submission_date
        };

        connection.query("UPDATE tutorials_tbl SET ? WHERE id = ? ", [data,id], function(err,rows){
            if(err)
                console.log("Error updateing: %s ", err);
            res.redirect('/tutorials');
        });
    });
};

exports.delete_customer = function(req,res){
    var id = req.params.id;

    req.getConnection(function(err,connection){
        connection.query("DELETE FROM tutorials_tbl WHERE id = ? ", [id], function(err,rows) {
            if(err)
                console.log("Error deleting: %s ", err);
            res.redirect('/tutorials');
        });
    });
};
