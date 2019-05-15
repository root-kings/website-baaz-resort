// ----- Initialize Express -----

const express = require('express')
const app = express()

// ----- Configuration -----

const port = process.env.PORT

// const dbport = process.env.MONGODB_URI

const routes = require('./routes.js')

// ----- Middleware -----

const morgan = require('morgan')
app.use(morgan('dev'))

// -----

// Import the mongoose module
// const mongoose = require('mongoose')

// Set up default mongoose connection
// mongoose.connect(dbport, { useNewUrlParser: true })
// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise
// Get the default connection
// const db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// -----

const bodyParser = require('body-parser')

// To parse URL encoded data
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

// To parse json data
app.use(bodyParser.json())

// -----

app.set('view engine', 'pug')
app.set('views', './views')

// -----

const cors = require('cors')
app.use(cors())

// -----

// const favicon = require('serve-favicon')
// app.use(favicon('./www/favicon.ico'))

// -----

app.use(express.static('public'))

// -----

app.use('/', routes)

// -----

app.use(function(req, res) {
	res.status(404)

	// respond with html page
	if (req.accepts('html')) return res.render('404', { url: req.url })

	// respond with json
	if (req.accepts('json')) return res.send({ error: 'Not found' })

	// default to plain-text. send()
	return res.type('txt').send('Not found')
})

// ----- Start listening -----

app.listen(port, function(err) {
	if (err) throw err

	console.log('App listening on port ' + port)
})
