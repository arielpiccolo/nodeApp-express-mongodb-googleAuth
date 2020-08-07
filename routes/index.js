const express = require('express');
const route = express.Router();


// @desc  Login/Landing page
// @route GET /
route.get('/', (req, res) => {

    //  lets declare the specific layout we are using for the login page.
    res.render('login', {
        layout: 'login',
    })
});


// @desc  Dashboard
// @route GET / dashboard
route.get('/dashboard', (req, res) => {
    res.render('dashboard')
});


module.exports = route