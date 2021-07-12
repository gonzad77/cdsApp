const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETEKEY, {
            expiresIn: '1h'
        }, ( err, token ) => {
            if ( err ) {
                reject( 'Error genereting token' )
            } else {
                resolve( token );
            }
        })
    })

}

module.exports = {
    generateJWT
}