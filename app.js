//declaration
const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./controllers/login');
const registration = require('./controllers/registration');
const logout = require('./controllers/logout');
const userdash = require('./controllers/userdash');
const admin = require('./controllers/admin');
const app = express();

//config
app.set('view engine', 'ejs');

//middleware
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exSession({ secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());

app.use('/login', login);
app.use('/registration', registration);
app.use('/logout', logout);
app.use('/userdash', userdash);
app.use('/admin', admin);

//route
app.get('/', (req, res) => {
    res.send('Hello from express server');
});

//server startup
app.listen(2025, (error) => {
    console.log('express server started at 2025...');
});