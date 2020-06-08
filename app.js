const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const QRCode = require('qrcode');

var app = express();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,  __dirname + '/images/cartes');
  },
  filename: function(req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
      req.fileName = req.body.restaurantName + ".jpg";
      cb(null, req.fileName);
    }
    else if (file.mimetype ==='image/png') {
      req.fileName = req.body.restaurantName + ".png";
      cb(null, req.fileName);
    }
  }
});

var upload = multer({
  storage : storage
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/publish', function(req, res, next) {
  res.sendFile(__dirname + "/views/publish.html");
});

app.get('/retreive', function(req, res, next) {
  console.log("here3");
  res.sendFile(__dirname + "/views/retreive.html");
});

app.get('/qrcode', function(req, res, next) {
  res.sendFile(__dirname + "/views/qrcode.html");
});

app.post('/upload', upload.single('photo'), function(req, res){
  if (req.file) {
    QRCode.toFile(__dirname + "/images/qrcode/" + req.fileName, "http://localhost:3000/cartes/" + req.fileName, {
    }, function (err) {
        res.redirect("/qrcode?file=http://localhost:3000/qrcode/" + req.fileName);
    });
  }
  else {
    res.json({"error" : "No file"});
  }
});

module.exports = app;
