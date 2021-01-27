const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller_users')
const { validationResult, body,param } = require('express-validator')

router.post('/login',  function (req, res) {
    controller.login(req, res); 
})

router.post('/register', [
    body('email').isEmail().notEmpty().escape(),
    body('name').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('height').notEmpty().escape().isNumeric(),
    body('birth').notEmpty().escape(),
    body('weight').notEmpty().escape().isNumeric(),
    body('photoUrl').notEmpty()

],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.register(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.post('/users', function (req,res) {
    controller.checkEmail(req,res);
    
})
router.put('/recoverpassword/:email', [
    param('email').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.resetPassword(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.get('/getuser/:_id', [
    param('_id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getUserById(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.put('/update/:_id', [
    param('_id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.updateDetails(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.put('/updatephoto/:_id', [
    param('_id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.updatePhoto(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.post('/savephoto',  function (req, res) {
    controller.savePhoto(req, res); 
})

 

module.exports = router