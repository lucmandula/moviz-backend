var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const apiKey = process.env.TMDB_API_KEY

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

router.get('/movies', (req, res) => {

    fetch(url)
    .then(res => res.json())
    .catch(err => console.error('error'+ err))
    .then(data => {
        console.log(data.results)

        let moviesData = [];
        for (let movie of data.results) {
            moviesData.push({ title:movie.title, overview:movie.overview.substring(0, 250)+"...", poster_path:`https://image.tmdb.org/t/p/w500${movie.poster_path}`, voteAverage:movie.vote_average, voteCount:movie.vote_count })
        }
        res.json({  
            result:true,
            movies:moviesData
        })
    })
})

module.exports = router;
