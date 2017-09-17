const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  avatar: { type: String },
  email: { type: String },
  school: { type: String },
  position: { type: String, require: true },
  team: { type: String },
  skills: [String],
  phone: { type: String },
  address: {
    street_num: { type: String },
    street_name: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String }
  }
})

const Player = mongoose.model('Player', PlayerSchema)
module.exports = Player
