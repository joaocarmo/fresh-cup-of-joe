const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TweetSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

const TweetModel = mongoose.model('Tweet', TweetSchema)

module.exports = TweetModel
