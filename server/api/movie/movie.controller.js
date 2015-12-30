'use strict';

var _ = require('lodash');
var Movie = require('./movie.model');

// Get list of movies
exports.index = function(req, res) {
  Movie.find(function (err, movies) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(movies);
  });
};

//Get list of movies the user ownes and barrowing
exports.userMovies = function(req, res){
  console.log(req)
  Movie.
  find({
    $or: [{'status.borrower': req.user._id},{owner: req.user._id}]
  }, function(err, movies){
    console.log(movies);
    if(err) { return handleError(res, err); }
    return res.status(200).json(movies);
  });
};

// Get movies by geolocation.
exports.show = function(req, res) {
  Movie.find({
    loc: {
        $near: [req.query.long,req.query.lat] || [-122.7948,45.5422],
        $maxDistance: req.query.distance || 3.19280180152744
    }
}).exec(function(err, locations) {
    if (err) {
        return res.json(500, err);
    }
    res.json(200, locations);
});
};

// Creates a new movie in the DB.
exports.create = function(req, res) {
  Movie.create(req.body, function(err, movie) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(movie);
  });
};

// Updates an existing movie in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Movie.findById(req.params.id, function (err, movie) {
    if (err) { return handleError(res, err); }
    if(!movie) { return res.status(404).send('Not Found'); }
    var updated = _.merge(movie, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(movie);
    });
  });
};

//Make a request to barrow.
exports.barrow = function(req,res,next) {
  Movie.findById(req.body.movie, function (err, movie) {
    if (err) { return handleError(res, err); }
    if(!movie) { return res.status(404).send('Not Found'); }
    if(movie.status.checkedOut !== "false"){
      return res.status(403).send('Not Available for Barrow')
    }
    var updated = movie;
    updated.status.checkedOut = "request";
    updated.status.borrower = req.user._id;
    updated.save(function(err){
      return res.status(200).send()
    })
  })
}

//Approve a request to barrow.
exports.approve = function(req, res) {
  console.log(req);
  Movie.findById(req.body.movie, function (err, movie) {
    if (err) { return handleError(res, err); }
    if(!movie) { return res.status(404).send('Not Found'); }
    if(req.user._id !== movie.owner){ return res.status(401).send('Wrong user account')}
    if(movie.status.checkedOut !== "request"){
      return res.status(403).send('Request for barrow not set')
    }
    var updated = movie
    updated.status.checkedOut = "true";
    updated.save(function(err){
      return res.status(200).send()
    })
  })
}

// Deletes a movie from the DB.
exports.destroy = function(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    if(err) { return handleError(res, err); }
    if(!movie) { return res.status(404).send('Not Found'); }
    movie.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
