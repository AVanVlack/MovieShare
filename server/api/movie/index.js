'use strict';

var express = require('express');
var controller = require('./movie.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/list', controller.show);
router.get('/user', auth.isAuthenticated(), controller.userMovies);
router.post('/', auth.isAuthenticated(), controller.create);
router.patch('/req', auth.isAuthenticated(), controller.barrow);
router.patch('/deny', auth.isAuthenticated(), controller.deny);
router.patch('/approve', auth.isAuthenticated(), controller.approve);
router.patch('/return', auth.isAuthenticated(), controller.return);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
