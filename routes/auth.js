const express = require('express');
const passport = require('passport');
const route = express.Router();


// @desc  Auth with google
// @route GET /auth/google
route.get('/google', passport.authenticate('google', { scope: ['profile'] }))


// @desc  Google auth callback
// @route GET /auth/google/callback
route.get(
    '/google/callback',
     passport.authenticate('google', { failureRedirect: '/'}),
     (req, res) => {
        res.redirect('/dashboard')
    }
)


// @desc  logout user
// @route /auth/logout

route.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})





module.exports = route