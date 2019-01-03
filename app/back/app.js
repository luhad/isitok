// requires
const express = require("express")
const mongoose = require("mongoose")
const middleware = require("./components/middleware")
const bodyParser = require("body-parser")
const routes = require("./routes")

// express
const app = express()

// middlewares
app.use((req, res, next) => {
  middleware.defaultHeader(req, res)
  req.method == 'OPTIONS' ? res.sendStatus(204) : next()
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// routing
app.use('/api', routes); 

// export
module.exports = app