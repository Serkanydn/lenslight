const express = require('express');
require('dotenv').config()
require('./mongo-connection')

const app = express();

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})


app.listen(process.env.PORT, () => [
    console.log(`Application listening on port:${process.env.PORT}`)
])