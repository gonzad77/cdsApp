const { Schema, model } = require('mongoose');
const { pre } = require('../lib/schema');

const MovieSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    suggestionForTodayScore: {
        type: Number,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    addedAt: {
        type: Date
    }
});

MovieSchema.methods.toJSON = function() {
    const { __v, users, ...user  } = this.toObject();
    return user;
}

pre(MovieSchema);

module.exports = model( 'Movie', MovieSchema );
