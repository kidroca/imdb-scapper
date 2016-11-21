const constants = require('../config/constants');
const urlGenerator = require('./url-generator');
const moviesGenerator = require('./movies-generator');

module.exports = {
    generate
};

function generate() {

    urlGenerator.config({
        genres: constants.genres,
        pagesCount: constants.pagesCount
    });

    let urlQueue = urlGenerator.createUrlsQueue();

    moviesGenerator.config({ urlQueue });

    return moviesGenerator.generateMovies();
}