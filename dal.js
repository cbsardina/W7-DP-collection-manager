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
  // getRobots(url)
  //   return robots;
}


// ---------- find player --> get 1 player for full page ----------
function findById (playerId) {
  return Player.find({ id: playerId }).catch(function(err) {
    console.log(err);
  })
}
//-----NEW BELOW for UPDATE

// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
// Find the existing resource by ID
// Player.findById(req.params.id, (err, playa) => {
//     // Handle any possible database errors
//     if (err) {
//         res.status(500).send(err);
//     } else {
//         // Update each attribute with any possible attribute that may have been submitted in the body of the request
//         // If that attribute isn't in the request body, default back to whatever it was before.
//         playa.id = playa.id
//         playa.name = req.body.name
//         playa.position = req.body.position
//         playa.school = req.body.school
//         playa.team = req.body.team
//         playa.slills = req.body.skills
//         playa.email = req.body.email
//         playa.phone = req.body.phone
//         playa.street_num = req.body.streetNum
//         playa.street_name = req.body.streetName
//         playa.city = req.body.city
//         playa.state = req.body.state
//         playa.zip_code = req.body.zip
//         playa.avatar = req.body.picture
//
//         // Save the updated document back to the database
//         playa.save((err, playa) => {
//             if (err) {
//                 res.status(500).send(err)
//             }
//             res.status(200).send(playa);
//         });
//     }
// });

// =====NEW BELOW FOR ADD

// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
// Find the existing resource by ID
// Player.findById(req.params.id, (err, playa) => {
//     // Handle any possible database errors
//     if (err) {
//         res.status(500).send(err);
//     } else {
//         // Update each attribute with any possible attribute that may have been submitted in the body of the request
//         // If that attribute isn't in the request body, default back to whatever it was before.
//         playa.id = (db.players.count())+1
//         playa.name = req.body.name
//         playa.position = req.body.position
//         playa.school = req.body.school
//         playa.team = req.body.team
//         playa.slills = req.body.skills
//         playa.email = req.body.email
//         playa.phone = req.body.phone
//         playa.street_num = req.body.streetNum
//         playa.street_name = req.body.streetName
//         playa.city = req.body.city
//         playa.state = req.body.state
//         playa.zip_code = req.body.zip
//         playa.avatar = req.body.picture
//
//         // Save the updated document back to the database
//         playa.save((err, playa) => {
//             if (err) {
//                 res.status(500).send(err)
//             }
//             res.status(200).send(playa);
//         });
//     }
// });








//  ---------- find by username -------------
function findByUsername (usrnm) {
  return Robot.find({ username: usrnm }).catch(function(err) {
    console.log(err);
  })
}

//  ---------- filters for unemployed robots -------------
function getUnemployed () {
  return Robot.find({ job: null }).catch(function(err) {
    console.log(err);
  })
}

// ---------- filters for employed robots -----------------
function getEmployed () {
  return Robot.find({ job: { $ne: null } }).catch(function(err) {
    console.log(err);
  })
}

// ---------- add a robot -----------------
function addRobot (newRobot) {
  let robot = new Robot(newRobot)
    robot.save(function(err){
      console.log('addRobot err ::', err);
    })
    return Promise.resolve()
} //end

// ---------- update a robot -----------------
function updateRobot () {
  return Robot.updateone({username: thisUsername},
    {$push: {name: thisName}}     // <<======== pick up here
  )
}

// TEMP add robo passwordHash
function addRoboPasswords() {
  console.log('enters fn addRoboPasswords.');
  Robot.updateMany(
    {},
    {passwordHash: 'password123'}
  )
  console.log('at return of the promise.');
  return Promise.resolve()
}


// function addRoboPasswords () {
//   console.log("==========");
//   console.log(Robot.find());
//   console.log("==========");
//   for(i in Robot.length){
//     j = 5;
//       Robot.updateOne({id: i}, { passwordHash: "'mypassword' + j" })
//       console.log('Robot at::' [i]);
//       console.log(Robot[i]);
//       j++
//   }
//   return Promise.resolve()
// }
//TEMP FUNCITON WAS NOT DOING AN



module.exports = {
  getAllPlayers,
  findById,
  getUnemployed,
  getEmployed,
  findByUsername,
  addRobot,
  updateRobot,
  addRoboPasswords
}
