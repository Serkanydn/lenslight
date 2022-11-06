const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("We are connected to mongodb!")
})

