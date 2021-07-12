const { response } = require('express');

const { hashIt } = require('../helpers/password.helper');
const User = require('../models/user');

const createUser = async(req, res = response) => {
    try {

        const { firstName, lastName, password, email } = req.body;

        const bPassword = hashIt(password);
        const user = new User({
            email, 
            password: bPassword, 
            firstName, 
            lastName
        });
        await user.save();

        res.json(user);
    } catch {
        return res.status(500).send("Error creating user");
    }
}

module.exports = {
    createUser
}