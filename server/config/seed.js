/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Movie = require('../api/movie/movie.model');
var User = require('../api/user/user.model');

Movie.find({}).remove(function() {
  Movie.create({

  });
});

User.find({}).remove(function() {
  User.create({

    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    location: {
      place: "Portland, Oregon",
      coords: [
      "-122.6741949",
      "45.5202471"
      ]
    }
  },{
    provider: 'local',
    name: 'Test User',
    email: 'test2@test.com',
    password: 'test',
    location: {
      place: "Portland, Oregon",
      coords: [
      "-122.6741949",
      "45.5202471"
      ]
    }
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
