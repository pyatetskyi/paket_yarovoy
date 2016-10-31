var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var pdfLogSchema = new Schema({
	userName: {	type: String,	require: true, unique: true},
  personName: { type: String, require: true },
  email: { type: String, require: true },
  synopsis: { type: String, require: false },
  ratePerMinute: { type: Number, require: true },
  likes: { type: Number, default: 0 },
	skilltaglist: [{type: String}],
	created_at: Date,
	updated_at: Date

  /*avatar: { data: Buffer, contentType: String },
  canvas: { data: Buffer, contentType: String },
  skilltaglist: [{type: String}],
  feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]*/
/*
	meta: {
		age: Number,
		mentor: Boolean
	}
*/
});

pdfLogSchema.pre('save', function(next) {
	var isoDate = new Date().toISOString();

  this.updated_at = isoDate;
  if (!this.created_at)
    this.created_at = isoDate;
  next();
});

var PdfLog = mongoose.model('user_profile', pdfLogSchema);

var pdfLog = {
	readAll: function(req, res, next) {
		PdfLog.find({}, function(err, pdfList){
			if (err) {
				next(err)
			} else {
				res.json(pdfList)
			}
		})
  },

	readOne: function(req, res, next) {
		if (!req.params.id) {
			next();
		}
    var fileId = req.params.id;
		PdfLog.find({'userName': fileId}, function(err, pdf) {
			if (err) {
		  	next(err);
		  }
		  res.json(pdf);
		})
  },

	create: function(req, res, next) {
		if (!req.body.data) {
			next();
		}
		var pdfFileData = req.body.data;
		var newPdf = new PdfLog(pdfFileData)
		newPdf.save(function(err, pdfLog){
			if (err) {
				next(err)
			} else {
				res.json(pdfLog);
			}
		})
	},

  update: function(req, res, next) {
		if (!req.params.id) {
			next();
		}
	},

  delete: function(req, res, next) {
		if (!req.params.id) {
			next();
		}
		var fileId = req.params.id;
		PdfLog.findByIdAndRemove(fileId, function(err) {
		  if (err) throw err;
		});
	}

};

module.exports = pdfLog;
