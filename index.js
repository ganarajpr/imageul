// http -f POST :3000/upload avatar@~/github/imageul/1.jpeg


var express = require('express'),
    multer  = require('multer');
    var cors = require('cors');

    var path = require('path');
    var _ = require('lodash');

var app = express();
app.use(cors());
var storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});
var imageExtensions = ['.jpeg', '.jpg', '.png'];

function fileFilter (req, file, cb) {

  var uriExtension = path.extname(file.originalname).toLowerCase();

  if(_.include(imageExtensions,uriExtension)){
      cb(null, true);
  }
  else{
      console.log("rejected filetype mismatch");
      cb(null, false);
  }

}

var upload = multer({
    storage: storage,
    fileFilter : fileFilter,
    limits : {
        files : 1,
        fileSize : 5*1024*1024 //5MB
    }
});

app.post('/upload', upload.single('wireframe'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  // form files
  res.status(204).end();
});



console.log("listening on 3000");
app.listen(3000);
