const express = require('express')
const router = express.Router()
const {
  getAllPlayers,
  findById,
  updatePlayer,
  addPlayer,
  deletePlayer
} = require('../dal')

// ------------- ALL PLAYERS --------------------------

router
  .route('/')
  .get((req, res) => {
  res.redirect('/index')
})

router
  .route('/index')
  .get((req, res) => {
    getAllPlayers().then(function(playas) {
    res.render('index', {playas})
  })
})

// ------------ FULL PLAYER PROFILE & EDIT ------------------------
router
  .route('/detail_edit/:_id')
    .get((req, res) => {
      findById(req.params._id).then(function(aplaya) {
        res.render('onePlayer', aplaya[0])
      })
    })
  .post((req, res) => {
    const b = req.body
    updatePlayer(req.params._id, b.name, b.avatar, b.email,
                          b.school, b.position, b.team, b.skills,
                          b.phone, b.streetNum, b.streetName, b.city,
                          b.state, b.zip)
        res.redirect('/index')
      })
// ---------- ADD PLAYER ----------------------

router
  .route('/add_player')
    .get((req, res) => {
      res.render('add_player')
    })
  .post((req, res) => {
    const b = req.body
    addPlayer(b.name, b.avatar, b.email, b.school, b.position, b.team,
            b.skills, b.skills, b.phone, b.streetNum, b.streetName,
            b.city, b.state, b.zip)
      res.redirect('/index')
    })

// ---------- DELETE PLAYER ----------------------
router
  .route('/delete_player/:_id')
    .get((req, res) => {
      findById(req.params._id).then(function(aplaya) {
        res.render('delete_player', aplaya[0])
      })
    })
router
  .route('/remove_player/:_id')
    .post((req, res) => {
      deletePlayer(req.params._id).then(function() {
        res.redirect('/index')
      })
    })

module.exports = router;
