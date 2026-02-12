const express = require('express');
const app =express();
const port =3000;
const cookieparse  = require('cookie-parser');
require('dotenv').config();
app.use(cookieparse());


app.use(express.json());
app.use(express.static('public'));

const register = require('./routes/reg');
app.use('/register',register);

const login = require('./routes/auth');
app.use('/login',login);

const tasks = require('./routes/task');
app.use('/tasks',tasks);

const weather = require('./routes/weather');
app.use('/weather',weather);

const movie = require('./routes/movie');
app.use('/movie',movie);

app.listen(port,()=>{
    console.log(`your site is live at http://localhost:${port}`);
    
});
