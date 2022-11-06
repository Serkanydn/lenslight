const express = require('express');
require('dotenv').config()
require('./mongo-connection')
const { pageRouter } = require('./routes');

const app = express();

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))

app.use('/', pageRouter);



app.listen(process.env.PORT, () => [
    console.log(`Application listening on port:${process.env.PORT}`)
])