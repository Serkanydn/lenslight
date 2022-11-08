const express = require('express');
const cookieParser = require('cookie-parser')
const { pageRouter, photoRouter, userRouter } = require('./routes');
const { auth } = require('./utils');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2
const methodOverride=require('method-override')

require('dotenv').config()
require('./mongo-connection')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const app = express();

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json())
//Form body içerisindeki verileri parse edebilmesi için.
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))
app.use(methodOverride('_method',{
    methods: ['POST', 'GET']
}))

//routes
app.use('*', auth.checkUser);
app.use('/', pageRouter);
app.use('/photos', photoRouter);
app.use('/users', userRouter);



app.listen(process.env.PORT, () => [
    console.log(`Application listening on port:${process.env.PORT}`)
]) 