const movie = require('../models/movie');
const User = require('../models/user');

const emailExists = async( email = '' ) => {

    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`${ email } is already register`);
    }
}

module.exports = {
    emailExists
}