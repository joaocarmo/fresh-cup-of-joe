const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')
const cors = require('cors')
const mongoose = require('mongoose')
const service = require('feathers-mongoose')
const TweetModel = require('./services/tweet/model')
const FakeTweet = require('./services/tweet/fake')

mongoose.Promise = global.Promise

// Get the server port from the environment or default to 3001
const SERVER_PORT = process.env.SERVER_PORT || 3001

// Connect to the MongoDB instance
const MONGO_SERVER = process.env.MONGO_SERVER || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_DB = process.env.MONGO_DB || 'fcoj'
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_CONNECTION = MONGO_USER && MONGO_PASS
  ? `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
  : `mongodb://${MONGO_SERVER}:${MONGO_PORT}/${MONGO_DB}`

mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const API_PREFIX = '/api'
const API_TWEETS = `${API_PREFIX}/tweets`

// Creates an ExpressJS compatible Feathers application
const app = express(feathers())

// Parse HTTP JSON bodies
app.use(express.json())
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }))
// Host static files from the current folder
app.use(express.static(__dirname))
// Add REST API support
app.configure(express.rest())
// Configure Socket.io real-time APIs
app.configure(socketio())
// Enable CORS
app.use(cors())
// Connect to the db, create and register a Feathers service.
app.use(API_TWEETS, service({
  Model: TweetModel,
  // Set to 'false' if you want Mongoose documents returned
  lean: true,
}))
// Register a nicer error handler than the default Express one
app.use(express.errorHandler())

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
)
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'))

// For good measure let's create some tweets
// So our API doesn't look so empty
app.service(API_TWEETS).find({}).then((docs) => {
  if (docs && docs.length < 1) {
    app.service(API_TWEETS)
      .create(FakeTweet.generate())
      .then((tweet) => {
        console.log('Created tweet:', tweet);
      })
      .catch((err) => {
        console.error('ERROR:', err.message)
      })
  }
}).catch((err) => {
  console.error('ERROR:', err.message)
})

// Start the server
app.listen(SERVER_PORT).on('listening', () =>
  console.log(`Server listening on localhost:${SERVER_PORT}`)
)
