const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const QRCode = require('qrcode');
const config = require('./config.json');
const fs = require('fs');

var multer = require('multer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'views')));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,  __dirname + '/images/cartes');
  },
  filename: function(req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
      req.fileName = req.body.restaurantName + ".jpg";
      try {
        if (fs.existsSync(__dirname + '/images/cartes/' + req.fileName)) {
          var d = new Date();
          req.fileName = req.body.restaurantName +  "_" + d.getTime() + ".jpg";
          cb(null, req.fileName);
        }
        else  {
          cb(null, req.fileName);
        }
      } catch(err) {
        console.error(err)
      }
    }
    else if (file.mimetype ==='image/png') {
      req.fileName = req.body.restaurantName + ".png";
      try {
        if (fs.existsSync(__dirname + '/images/cartes/' + req.fileName)) {
          var d = new Date();
          req.fileName = req.body.restaurantName +  "_" + d.getTime() + ".png";
          cb(null, req.fileName);
        }
        else  {
          cb(null, req.fileName);
        }
      } catch(err) {
        console.error(err)
      }
    }
  }
});

var upload = multer({
  storage : storage
});

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/publish', function(req, res, next) {
  res.sendFile(__dirname + "/views/publish.html");
});

app.get('/retreive', function(req, res, next) {
  res.sendFile(__dirname + "/views/retreive.html");
});

app.get('/qrcode', function(req, res, next) {
  res.sendFile(__dirname + "/views/qrcode.html");
});

app.post('/publish', upload.single('photo'), function(req, res) {
  if (req.file) {
    QRCode.toFile(__dirname + "/images/qrcode/" + req.fileName, config.url + "/cartes/" + req.fileName, {}, function (err) {
        res.redirect("/qrcode?file=" + config.url + "/qrcode/" + req.fileName + "&restaurant=" + req.body.restaurantName);
    });
  }
  else {
    res.json({"error" : "No file"});
  }
});

app.post('/retreive', upload.none(), function(req, res) {
  QRCode.toFile(__dirname + "/images/qrcode/" + req.body.restaurantName + ".jpg", req.body.menuURL, {}, function (err) {
      res.redirect("/qrcode?file=" + config.url + "/qrcode/" + req.body.restaurantName + ".jpg&restaurant=" + req.body.restaurantName);
  });
})

module.exports = app;
