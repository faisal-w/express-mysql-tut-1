var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var dateFormat = require('dateformat');
var logger = require('morgan');
var routes = require('./routes');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var tutorialsRouter = require('./routes/tutorials');

var connection = require('express-myconnection');
var mysql = require('mysql');

var app = express();

// MySQL connection
app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'testdb'
    },'request')
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);//route customer list
app.get('/tutorials', tutorialsRouter.list);
app.get('/tutorials/add', tutorialsRouter.add);
app.post('/tutorials/add', tutorialsRouter.save);
app.get('/tutorials/delete/:id', tutorialsRouter.delete_customer);
app.get('/tutorials/edit/:id', tutorialsRouter.edit);
app.post('/tutorials/edit/:id', tutorialsRouter.save_edit);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/tutorials', tutorialsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
