const { response, request } = require('express');
const axios = require('axios');

const Movie = require('../models/movie');
const User = require('../models/user');
const movie = require('../models/movie');

const path = "https://api.themoviedb.org/3/"

const getMovies = async (req = request, res = response) => {

    const { keyword, page } = req.query;
    try {
        
        // If there is not keyword, we get popular movies
        const keywordQuery = (keyword !== undefined) ? `&query=${keyword}` : '';
        const pageQuery = (page !== undefined && keyword !== undefined) ? `&page=${page}` : '';

        const baseQuery = (keyword !== undefined) ? 'search/movie' : 'movie/popular';

        const request = {
            url: `${path}${baseQuery}?api_key=${process.env.THEMOVIEAPIKEY}${keywordQuery}${pageQuery}`
        }

        const result = await axios.get(request.url);

        let movies = result.data.results;
        if (movies) {

            // Add suggestinScore attr
            movies.forEach(movie => {
                movie['suggestionScore'] = randomNumber(1, 99);
            });

            // Sort movies by suggestionScore
            movies.sort((a, b) =>  b.suggestionScore - a.suggestionScore);

            res.status(200).json({
                movies
            })
        } else {
            throw new Error();
        }
        
    } catch {
        res.status(500).json({
            message: 'Error getting movies'
        });
    }   
}

const addMovieToFavourites = async (req, res = response) => {

    const { id, title, release_date, overview } = req.body;

    try {
        // Manage movies on db
        let movie = await Movie.findOne({ id });
        if( !movie ) {
            const suggestionForTodayScore = randomNumber(0,99);
            movie = new Movie({
                id, 
                title, 
                release_date, 
                overview, 
                suggestionForTodayScore
            });
            await movie.save();
        }

        // Add favourite movie to user
        const user = await User.findById(req.user.uid);
        const existMovie = user.favouritesMovies.includes(movie._id);
        if (!existMovie) {
            user.favouritesMovies.push(movie._id);
            movie.users.push(req.user.uid);
            // Updates for relationship
            await movie.save();
            await user.save();
            res.status(200).json({message: "Favourite movie added"});
        } else {
            res.status(200).json({message: "Favourite movie already added"});
        }

    } catch {
        res.status(500).json({
            message: 'Error adding movie to favourites'
        });
    }

}

const getFavouritesMovies = async (req = request, res = response) => {

    try {
        const movies = await Movie.find({users: {$in: req.user.uid}}).sort({suggestionForTodayScore: 'desc'});
        res.status(200).json({movies});
    } catch {
        res.status(500).json({
            message: 'Error getting favourites movies'
        });
    }

}

const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
    getMovies,
    addMovieToFavourites,
    getFavouritesMovies
}