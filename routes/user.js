const { Router } = require('express');
const { check } = require('express-validator');

const { emailExists } = require('../helpers/db.helper');
const { validFields } = require('../middlewares/fields.validator');
const { createUser } = require('../controllers/user.controller')


const router = Router();

router.post('/',[
    check('firstName', 'Firstname is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters long ').isLength({ min: 6 }),
    check('email', 'The email is invalid').isEmail(),
    check('email').custom( emailExists ),
    validFields
], createUser );

module.exports = router