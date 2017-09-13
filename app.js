//SERVER.JS

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const {
  getAllPlayers,
  findById,
  getUnemployed,
  getEmployed,
  findByUsername,
  addRobot,
  updateRobot,
  addRoboPasswords
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

// verify login
// function isLoggedIn(req, res, next) {
//   if(req.session.usr) {
//     next();
//   }
//   else {
//     res.render('sorry');
//   }
// }


//============== ROUTES ========================

// ------------- ALL PLAYERS --------------------------
app.get('/', (req, res) => {
  getAllPlayers().then(function(playas) {
    console.log(req.session)
    res.render('index', {playas})
  })
})


// ------------ FULL PLAYER PROFILE ------------------------
app.get('/detail_edit/:id', (req, res) => {
  const playaId = parseInt(req.params.id, 10)
  console.log(req.session)
  findById(playaId).then(function(aplaya) {
    res.render('onePlayer', aplaya[0])
  })
})
app.put('/index/:id', (req, res) => {
  res.redirect('/')
})
// ---------- JOB SEEKERS ----------------------
app.get('/add_player', (req, res) => {
  res.render('add_player')
})

// ------------- EMPLOYED -----------------------
// app.get('/employed', (req, res) => {
//   getEmployed().then(function(roboEmp) {
//       res.render('employed', {roboEmp});
//   })
// })

// ------------- LOGIN -----------------------
app.get('/login', (req, res) => {
  res.render('login');
})

// ------------- REGISTER/ADD -----------------------
app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', (req, res) => {
  addRobot(req.body).then(function() {
    res.render('edit_profile')
  })
})

// ------------- EDIT -----------------------
app.get('/edit_profile', (req, res) => {
  addRoboPasswords().then(function() {      // fix this. used to add passwords to db
    res.redirect('/')                 // <== change back to render('/edit_profile')
  })
})

// ---------- /LOGOUT ----------
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

//============ SET PORT =========================
app.set('port', 3003);

app.listen(app.get('port'), () => {
  console.log('Application has started at port 3003')
});



// ================== NOT BEING USED========================
//
// // ------------- FIND by COUNTRY --------------------
// app.get('/index/:country', function (request, response) {
//   const roboCountry = roboDal.getRoboByCountry(request.params.country);
//     response.render('country', {roboCountry})
// })
//
// // -------------- FIND by SKILLS --------------------
// app.get('/skills/:.', function (request, response) {
//   const roboSkills = roboDal.getRoboBySkill(request.params.skills);
//     response.render('skills', {roboSkills})
// })
// ^^^^^^^^^^^^^^^^^ NOT BEING USED ^^^^^^^^^^^^^^^^^^^^^^^^^^
