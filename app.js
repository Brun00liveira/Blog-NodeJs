//imports
require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const MongoStore = require('connect-mongo');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//Instance
const app = express();

//banco dados

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),

}));
// server 

const PORT = 8000||process.env.PORT;
const HOST = 'localhost'||process.env.HOST


app.listen(PORT, () => {
    console.log( `Servidor iniciado em : http://${HOST}:${PORT}`);
})

//access public
app.use(express.static('public'));

//template engine
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

//routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));