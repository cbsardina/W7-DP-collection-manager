//SERVER.JS

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const {
  getAllPlayers,
  findById,
  updatePlayer,
  addPlayer,
  deletePlayer
} = require('./dal');
const Player = require('./model')
const MongoStore = require('connect-mongo')(session)

//set up 'public' directory for styles.css
app.use(express.static('public'));

//session
app.use(
  session({
    secret: 'puppy monkey baby',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: 'mongodb://localhost:27017/sesh',
      autoReconnect: true,
      clear_interval: 4000
    })
  }))

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//============== ROUTES ========================

// ------------- ALL PLAYERS --------------------------

app.get('/', (req, res) => {
  res.redirect('/index')
})
app.get('/index', (req, res) => {
  getAllPlayers().then(function(playas) {
    res.render('index', {playas})
  })
})

// ------------ FULL PLAYER PROFILE & EDIT ------------------------
app.get('/detail_edit/:_id', (req, res) => {
  // const playaId = parseInt(req.params._id, 10)
  findById(req.params._id).then(function(aplaya) {
    res.render('onePlayer', aplaya[0])
  })
})
app.post('/detail_edit/:_id', (req, res) => {
  const b = req.body
  updatePlayer(req.params._id, b.name, b.avatar, b.email,
                          b.school, b.position, b.team, b.skills,
                          b.phone, b.streetNum, b.streetName, b.city,
                          b.state, b.zip)
        res.redirect('/index')

})
// ---------- ADD PLAYER ----------------------
app.get('/add_player', (req, res) => {
  res.render('add_player')
})
app.post('/add_player', (req, res) => {
  const b = req.body
  addPlayer(b.name, b.avatar, b.email, b.school, b.position, b.team,
            b.skills, b.skills, b.phone, b.streetNum, b.streetName, b.city, b.state, b.zip)
  res.redirect('/index')
})

// ---------- DELETE PLAYER ----------------------
app.get('/delete_player/:_id', (req, res) => {
  findById(req.params._id).then(function(aplaya) {
    res.render('delete_player', aplaya[0])
  })
})
app.post('/remove_player/:_id', (req, res) => {
  deletePlayer(req.params._id).then(function() {
      res.redirect('/index')
  })

})

//============ SET PORT =========================
app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log('Application has started at port 3000')
});
