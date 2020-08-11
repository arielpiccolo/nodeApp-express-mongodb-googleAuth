const express = require('express');
const route = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')


// @desc  Login/Landing page (ensureGuest)
// @route GET /
// guests can see the login page
route.get('/', ensureGuest, (req, res) => {

    //  lets declare the specific layout we are using for the login page.
    res.render('login', {
        layout: 'login',
    })
});


// @desc  Dashboard
// @route GET / dashboard
// only logged in users can see this page(ensureAuth)
route.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard')
});


module.exports = route