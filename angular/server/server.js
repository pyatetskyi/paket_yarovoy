var express = require('express'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    http = require('http');
    multer = require('multer');

var app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('httpPort', (process.env.PORT || config.get('httpPort')));

app.use(cors());


const upload = multer({
  dest: './uploads/',
  storage: multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  })
});

app.post('/upload', upload.any(), (req, res) => {

  req.files.map(file => {
  var dirname = require('path').dirname(__dirname);
  var filename = file.name;
  var fpath = file.path;
  var type = file.mimetype;
  var read_stream =  fs.createReadStream(dirname + '/server/' + fpath);
  var Grid = require('gridfs-stream');
  var mongoose = require('./mongoose');
  Grid.mongo = mongoose.mongo;
  var conn = mongoose.connection;
  var gfs = Grid(conn.db);

  var writestream = gfs.createWriteStream({
     filename: filename
  });

  read_stream.pipe(writestream);
});


  res.json(req.files.map(file => {
    let ext = path.extname(file.originalname);
    return {
      originalName: file.originalname,
      filename: file.filename
    }
  }));
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var staticRoot = path.join(__dirname, '../');
app.use(express.static(path.join(__dirname, '../assets')));

require('./routes')(app, staticRoot);



app.use(function(err, req, res, next) {
    //var err = new HttpError(404, '404: Page Not Found');
    next(err);
});

var httpServer = http.createServer(app);

httpServer.listen(app.get('httpPort'), function() {
      console.log('app running on port', app.get('httpPort'));
});

/*
router.get('/file/:id',function(req,res){
      var pic_id = req.param('id');
      var gfs = req.gfs;

       gfs.files.find({filename: pic_id}).toArray(function (err, files) {

        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            var mime = 'image/jpeg';
            res.set('Content-Type', mime);
            var read_stream = gfs.createReadStream({filename: pic_id});
            read_stream.pipe(res);
        } else {
            res.json('File Not Found');
        }
    });
});
*/
