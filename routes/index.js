const express = require('express');
const route = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')


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
route.get('/dashboard', ensureAuth, async (req, res) => {

    // lean below is to use plain JS instead of a mongoose document
    try {
        // limit all stories to the logged user
        const stories = await Story.find({ user: req.user.id  }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })

    } catch (err) {
        console.log(err)
        res.render('error/500')
    }

});


module.exports = route