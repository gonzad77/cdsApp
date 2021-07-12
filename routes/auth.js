const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/fields.validator');

const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validFields
],login );

module.exports = router;