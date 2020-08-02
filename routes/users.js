const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);


//here we use passport as a middleware to authenticate
//here instead of 2, there are 3 arguments. first is requested url, middle one is a middleware of passport and the last is a controller action.
//this middleware actually authenticates the user 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}             //failureRedirect specifies the path to be followed in case authentication fails(i.e done returns false or err)
),usersController.createSession)

router.get('/sign-out',usersController.destroySession);
module.exports = router;