const express = require('express');
const { UserController } = require('../controllers/userController');
const { MovieController } = require('../controllers/movieController');
const { CinemaController } = require('../controllers/cinemaController');
const { CinemaFunctionController } = require('../controllers/cinemaFunctionsController');
const { CinemaRoomController } = require('../controllers/cinemaRoomsController');
const { RouteRegisterer } = require('./routeRegisterer');

// ================================================

const app = express();
const router = new RouteRegisterer(app);
router.resource('users', UserController);
router.resource('movies', MovieController);
router.resource('cinemas', CinemaController);
router.resource('rooms', CinemaRoomController);
router.resource('functions', CinemaFunctionController);

// ================================================

module.exports = app;

