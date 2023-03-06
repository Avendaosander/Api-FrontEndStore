const express = require('express')
const session = require("express-session");
const flash = require("connect-flash");
const router = require("./routes/routes");
const Users = require('./models/Users');
require('dotenv').config();
require('./database/db');

const app = express()

const cors = require("cors");
const corsOptions = {
    credentials: true,
    origin: process.env.PATHCORS || '*',
    methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

app.use(
   session({
       secret: process.env.SESSIONSECRET,
       resave: false,
       saveUninitialized: false,
   })
);
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

module.exports = app;