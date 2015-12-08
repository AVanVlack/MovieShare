'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
  owner: String,
  title: String,
  poster_path: String,
  backdrop_path: String,
  status: {
    borrower: String,
    checkedOut: String //request, true, false
  },
  tmdb_id: Number,
  release_date: Date,
  tagline: String,
  overview: String,
  loc: {type: [Number], index: '2dsphere'}
});
MovieSchema.index({ loc: '2dsphere' });

module.exports = mongoose.model('Movie', MovieSchema);
