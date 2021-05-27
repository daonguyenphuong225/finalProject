const express = require('express');
const path = require('path');
const mongoose = require('./config/mongo-connection');
const Router = require('./routes/index');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'public')))

app.use('/',Router)

app.listen(8000,()=>{
    console.log('server abc chay cong 8000');
})