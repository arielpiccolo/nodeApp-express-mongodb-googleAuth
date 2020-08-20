// create route for add.hbs(add new story form)

const express = require('express');
const route = express.Router();
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')





// @desc  Show add page
// @route GET /stories/add
route.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
});






module.exports = route