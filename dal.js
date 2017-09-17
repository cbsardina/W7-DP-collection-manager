//////////// DAL.js ///////////////
///////////////////////////////////

const mongoose = require('mongoose')
const Player = require('./model')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/playerdb', {
  useMongoClient: true
})

// ---------- getRobots from DB ----------
function getAllPlayers () {
  return Player.find()
}


// ---------- find player --> get 1 player for full page ----------
function findById (playerId) {
  return Player.find({ _id: playerId }).catch(function(err) {
    console.log(err);
  })
}

// ---------- edit player profile ----------
function  updatePlayer (paramsId, bodyName, bodyAvatar, bodyEmail,
                        bodySchool, bodyPosition, bodyTeam, bodySkills,
                        bodyPhone, bodyStreetNum, bodyStreetName, bodyCity,
                        bodyState, bodyZip) {
  Player.findOneAndUpdate({_id: paramsId},
                            {$set:{"name": bodyName,
                                   "avatar": bodyAvatar,
                                   "email": bodyEmail,
                                   "school": bodySchool,
                                   "position": bodyPosition,
                                   "team": bodyTeam,
                                   "skills": [bodySkills],
                                   "phone": bodyPhone,
                                   "address": {
                                     "street_num": bodyStreetNum,
                                     "street_name": bodyStreetName,
                                     "city": bodyCity,
                                     "state": bodyState,
                                     "zip_code": bodyZip}
                            }},
                          {new: false}, function(err, doc){
      if(err){
          console.log("ERROR UPDATING THE DATA");
      }

      console.log(doc);
  })
}

// ---------- add player ----------
function addPlayer(nName, nAvatar, nEmail, nSchool, nPosition, nTeam,
                   nSkills, nPhone, nStreetNum, nStreetName, nCity,
                   nState, nZip) {
  Player.create({name: nName,
                 avatar: nAvatar,
                 email: nEmail,
                 school: nSchool,
                 position: nPosition,
                 team: nTeam,
                 skills: [nSkills],
                 phone: nPhone,
                 address: {
                    street_num: nStreetNum,
                    street_name: nStreetName,
                    city: nCity,
                    state: nState,
                    zip_code: nZip
                 }
            }), function(err, doc) {
    if(err) {
      console.log("ERROR ADDING THE DATA");
    }
    console.log(doc);
  }
}

// ---------- delete player ----------
function deletePlayer(paramsId) {
  return Player.findOne({_id: paramsId}).remove()
}


module.exports = {
  getAllPlayers,
  findById,
  updatePlayer,
  addPlayer,
  deletePlayer
}
