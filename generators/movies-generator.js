'use strict';

const urlGenerator = require('./url-generator');
const httpRequester = require('../utils/http-requester');
const htmlParser = require('../utils/html-parser');
const modelsFactory = require('../models');
const timeoutUtils = require('../utils/timeout');

let urlsQueue = [];
let waitDuration = 1000;

module.exports = {
    config,
    generateMovies
};

/**
 * @param {Queue<String>} params.urlsQueue
 * @param {int} [params.waitDuration] - time to wait between requests in milliseconds
 * default is 1000
 */
function config(params) {
    urlsQueue = params.urlsQueue || urlsQueue;
    waitDuration = params.waitDuration || waitDuration;
}

function generateMovies() {

    return nextOrDie()
        .then(() => timeoutUtils.wait(waitDuration))
        .then(generateMovies)
        .catch((err) => console.dir(err, { colors: true }))
}

function nextOrDie() {
    if (urlsQueue.isEmpty()) {
        return Promise.resolve();
    }

    return getMoviesFromUrl(urlsQueue.pop());
}

/**
 * Parses a page of movies
 * @param url
 * @returns {Promise}
 */
function getMoviesFromUrl(url) {
    console.log(`Working with ${url.underline.blue}`);

    return httpRequester.get(url)
                 .then(parseToMoviesDataObjects)
                 .then(mapToDbModels)
                 .then(modelsFactory.insertManySimpleMovies);
}

function parseToMoviesDataObjects(result) {
    const selector = '.col-title span[title] a';
    const html = result.body;

    let movies = htmlParser.parseSimpleMovie(selector, html);
    return movies;
}

function mapToDbModels(movies) {
    let dbMovies = movies.map(movie => {
        return modelsFactory.getSimpleMovie(movie.title, movie.url);
    });

    return dbMovies;
}
