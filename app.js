//SERVER.JS

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const {
  getAllPlayers,
  findById,
  updatePlayer,
  addPlayer,
  deletePlayer
} = require('./dal')
const MongoStore = require('connect-mongo')(session)
const Player = require('./model')
const routes = require('./routes/routes')

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
app.use('/', routes)

//============ SET PORT =========================
app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log('Application has started at port 3000')
});
