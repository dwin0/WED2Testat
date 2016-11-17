var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var routes = require('./routes/noteRoutes');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Register Helper
var hbs = require('hbs');
hbs.registerHelper('timeUntil', function(endDate) {
  var date = new Date(endDate);
  return moment([date.getFullYear(), date.getMonth(), date.getDate()]).add(1, 'days').fromNow();
});

hbs.registerHelper('showImportance', function(importance) {
  var star = "";
  for(var i = 1; i <= importance; i++) {
    star = star + "* ";
  }
  return star;
});

hbs.registerHelper('buttonActivated', function(activeButtons, buttonName) {
  if(typeof activeButtons != 'undefined') {
      if(activeButtons.indexOf(buttonName) !== -1) {
          return 'btnActivated';
      }
  }
});

hbs.registerHelper('isButtonOn', function (allButtons, buttonName, options) {
  if(typeof allButtons != 'undefined') {
      if (allButtons.indexOf(buttonName) !== -1) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
  }
});


app.use(cookieParser());
app.use(session({secret: 'ueimnsiadf83ntbfinnnfgwngbjkrnwmer947505', resave: false, saveUninitialized: true}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Change Method to DELETE
app.use(require("method-override")(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;

    return method;
  }
}));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;