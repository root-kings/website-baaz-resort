const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
	res.render('index')
})

router.get('/contact', function(req, res) {
	res.render('contact')
})

router.get('/about', function(req, res) {
	res.render('about')
})

// Admin routes -----

router.get('/login', function(req, res) {
	res.render('login')
})

//export this router to use in our index.js
module.exports = router
