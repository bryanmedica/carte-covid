var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var QRCode = require('qrcode')
var app = express();
const multer = require('multer');
const upload = multer({dest: __dirname + '/images/upload'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/publish', function(req, res, next) {
  console.log("here2");
  QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
    console.log(url);
  })
  res.sendFile(__dirname + "/views/publish.html");
});

app.get('/retreive', function(req, res, next) {
  console.log("here3");
  res.sendFile(__dirname + "/views/retreive.html");
});

app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
      res.json(req.file);
  }
  else throw 'error';
});

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
  res.send('error');
});

module.exports = app;
