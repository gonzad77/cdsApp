const { response } = require('express');

const User = require('../models/user');

const { match } = require('../helpers/password.helper');
const { generateJWT } = require('../helpers/jwt.helper');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
      
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                message: 'User / Password incorrect'
            });
        }
        
        const validPassword = match( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                message: 'User / Password incorrect'
            });
        }

        const token = await generateJWT( user.id );

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error trying to login'
        });
    }   
}

module.exports = {
    login
}