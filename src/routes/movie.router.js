const { getAll, create, getOne, remove, update, setArctors, setDirectors, setGenres } = require('../controllers/movie.controller');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/actors')
    .post(setArctors)
movieRouter.route('/:id/directors')
    .post(setDirectors)
movieRouter.route('/:id/genres')
    .post(setGenres)
    

module.exports = movieRouter;