var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

// for allowing cross origin issue
var cors = require('cors')
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// following routes are register in application
var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var propertyRouter = require('./controllers/propertyDetails')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/property', propertyRouter);

//imported mongoose required package
const mongoose = require('mongoose');

//import application settings
const config = require('./config/settings')


//connecting to mongo db 
mongoose.connect(config.MongoDbConnection,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res)=>{
    console.log("connected to mongodb")
  }).catch(()=>{
    console.log("Mongo db connection failed")
  })

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
