var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var QRCode = require('qrcode')
var app = express();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(cb);
    cb(null,  __dirname + '/images/upload');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png')
    cb(null, true);
  else
    cb(null, false);
};

var upload = multer({
  storage : storage,
  fileFilter : fileFilter
});

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
  // QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
  //   console.log(url);
  // })
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

module.exports = app;
