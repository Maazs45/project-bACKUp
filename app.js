const express= require('express');
const expresslayouts= require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session= require('express-session');
const cookieparser= require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
app.use(expresslayouts);
app.use(cookieparser('GamingBlogSecure'));

app.use(session({
    secret: 'GamingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main');
app.set('view engine', 'ejs');



const routes= require('./server/routes/gameRoutes.js');
const { saveBufferToFile } = require('express-fileupload/lib/utilities');
app.use('/', routes);

app.listen(port, ()=> console.log('listening to port '));