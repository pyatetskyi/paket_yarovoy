

var express = require('express'),
    router = express.Router();

var pdfLog = require('./models/pdflog.js');

router.get('/api/pdfs', pdfLog.readAll);
router.get('/api/pdf/:id', pdfLog.readOne);
router.post('/api/pdf/', pdfLog.create);
router.put('/api/pdf/:id', pdfLog.update);
router.delete('/api/pdf/:id', pdfLog.delete);


module.exports = function(app, staticRoot) {


app.use('/api/v1', router);
/*
  var apiRoutes_v1 = require('./apiroutes_v1.js');

  app.all('/api/v1/*', authCheck);
  app.use('/api/v1', apiRoutes_v1);
*/
  app.get('/*', function(req, res) {
      res.sendFile(staticRoot + 'index.html'); // load our public/index.html file
  });
};
