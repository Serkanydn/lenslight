const express = require('express');
require('dotenv').config()
require('./mongo-connection')
const cookieParser = require('cookie-parser')
const { pageRouter, photoRouter, userRouter } = require('./routes');


const app = express();

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json())
//Form body içerisindeki verileri parse edebilmesi için.
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', pageRouter);
app.use('/photos', photoRouter);
app.use('/users', userRouter);



app.listen(process.env.PORT, () => [
    console.log(`Application listening on port:${process.env.PORT}`)
]) 