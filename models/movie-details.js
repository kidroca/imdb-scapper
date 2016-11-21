'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let MovieDetailsSchema = new Schema({
    forMovieId: {
        type: Schema.ObjectId,
        ref: 'SimpleMovie'
    },

    description: {
        type: String,
        required: true
    },

    coverUrls: {
        type: [String],
        required: true
    },

    trailerUrl: {
        type: String,
        required: false
    },

    genres: {
        type: [String],
        required: true
    },

    releaseDate: {
        type: Date,
        required: true
    },

    actors: {
        type: [{
            role: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            imdbId: {
                type: String,
                required: true
            },

            imageUrl: {
                type: String,
                required: true
            }
        }]
    }
});

let MovieDetails;

mongoose.model('MovieDetails', MovieDetailsSchema);
MovieDetails = mongoose.model('MovieDetails');
module.exports = MovieDetails;
