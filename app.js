// imports and setting

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
// morgan handle login
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
// session support stored in mongodb
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

// load config file
dotenv.config({ path: './config/config.env'} )

// passport config
require('./config/passport')(passport)

connectDB()


// initiate express
const app = express();


// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


// session
app.use(session({
    secret: 'mucha caca',
    resave: false,
    saveUninitialized: false,
    // login session stored in mongodb (MongoStore)
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))



// passport middleware
app.use(passport.initialize());
app.use(passport.session());


//  static folder settings
app.use(express.static(path.join(__dirname, 'public')))



// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 5000













// !=============================================================================
// default getaway 
app.listen(
    PORT,
    console.log(`server running at ${process.env.NODE_ENV} mode on port ${PORT}`)
);
