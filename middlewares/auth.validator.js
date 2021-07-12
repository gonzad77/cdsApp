const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ignoreUrls = ['/user', '/auth/login'];

router.use('/', function (req, res, next) {
    if (ignoreUrls.indexOf(req.path) > -1) {
        return next();
    }
  
    // Check token in header
    let token;
    if (req.headers && req.headers.authorization) {

        let parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            let scheme = parts[0]
            let credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {error: 'Format is Authorization: Bearer [token]'});
        }
    } else {
        return res.json(401, {error: 'No Authorization header was found'});
    }

    jwt.verify(token, process.env.SECRETEKEY, (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Invalid token'});
        } else {
            // save to request for use in other routes
            req.user = decoded;
            next();
        }
    });
});


module.exports = router;
