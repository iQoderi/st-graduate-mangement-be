const express = require('express');
const ejs = require('ejs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const CROS = require('./config/crossDomain');
const routes = require('./routes/index');
const users = require('./routes/api/auth');
const home = require('./routes/api/home');
const mongoose = require('mongoose');
const config=require('./config');
const app = express();

const host = config.mongo.host;
const dbOptions={
  user:config.mongo.user,
  pass:config.mongo.pass
};

mongoose.connect(`mongodb://${host}:27017/neuqst-graduate-mange`,dbOptions);
mongoose.connection.on('connected', function () {
     console.log('Mongoose connected to ');
});
mongoose.connection.on('error',function (err) {
      console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
      console.log('Mongoose disconnected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(CROS);
app.use('/', routes);
app.use('/users', users);
app.use('/home', home);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err.message);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // });
});


module.exports = app;
