const express = require('express');
const env = require('dotenv').config();
var cors = require('cors');
const connection = require('./connection');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const resultsRoute = require('./routes/results');
const usersRoute = require('./routes/users');
app.use('/results', resultsRoute);
app.use('/users',usersRoute);

module.exports = app;
