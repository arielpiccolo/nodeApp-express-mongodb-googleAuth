// imports and setting

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
// morgan handle login
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

// load config file
dotenv.config({ path: './config/config.env'} )

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


//  static folder settings
app.use(express.static(path.join(__dirname, 'public')))



// routes
app.use('/', require('./routes/index'))


const PORT = process.env.PORT || 5000













// !=============================================================================
// default getaway 
app.listen(
    PORT,
    console.log(`server running at ${process.env.NODE_ENV} mode on port ${PORT}`)
);
