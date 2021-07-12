const { Router } = require('express');

const { validFields } = require('../middlewares/fields.validator');

const { getMovies, addMovieToFavourites, getFavouritesMovies } = require('../controllers/movie.controller');

const router = Router();

router.get('/', getMovies );

router.get('/favourites', getFavouritesMovies );

router.post('/favourites',[
    validFields
],addMovieToFavourites );

module.exports = router