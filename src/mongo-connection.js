const mongoose = require("mongoose");
const PORT = process.env.DB_PORT || 3000;
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${PORT}/${process.env.DB_NAME}`,
  {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected to mongodb!");
});
