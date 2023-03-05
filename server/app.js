const express = require('express')
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
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

// Codigo para autenticar las sesiones con passport (No funciona, lo dejo para que funcione el logout)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(
   (user, done) => done(null, { id: user._id, name: user.nombre }) //se guardará en req.user
);

passport.deserializeUser(async (user, done) => {
   // console.log('Entra aqui en app.js')
   const userDB = await Users.findById(user.id).exec();
   return done(null, { id: userDB._id, name: userDB.nombre }); //se guardará en req.user
});
// Codigo para autenticar las sesiones con passport (No funciona, lo dejo para que funcione el logout)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

module.exports = app;