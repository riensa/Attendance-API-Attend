const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS
// var corsOptions = {
//   origin: "http://localhost:9001"
// };

app.use(cors());

// Sequelize
// const db = require("./models");
// db.sequelize.sync(); // uncomment if need to always check wheter table is already exist or not


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Attendance App." });
});

// routing
const routes = require('./routes')
app.use(routes) 


// set port, listen for requests
const PORT = process.env.PORT || 9003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});