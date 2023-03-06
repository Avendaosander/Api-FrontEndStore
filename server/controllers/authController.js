const Users = require('../models/Users')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerForm = (req, res) => {
   res.status(200).send('Registrate');
   // res.status(200).send({"mensajes": req.flash('mensajes')});
}
const crearUser = async (req, res, next) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
      req.flash("mensajes", errors.array());
      return res.status(404).json({"mensajes": req.flash('mensajes')})
   }
   const { nombre, email, password } = req.body;
   try {
      let user = await Users.findOne({ email });
      // console.log(user);
      if (user) throw new Error('Ya existe este usuario');
      
      user = new Users({nombre, email, password});
      // console.log(user);
      await user.save();

      const token = jwt.sign({id: user._id}, process.env.SECRETTK, {
         expiresIn: '5m'
      })

      return res.status(200).json({verificado: true, token});

   } catch (error) {
      // console.log(error.message);
      req.flash("mensajes", [{msg: error.message}]);
      return res.status(404).json({"mensajes": req.flash('mensajes')})
   }
}

const loginForm = (req, res) => {
   res.status(200).send("Inicia Sesion");
   // res.status(200).send({"mensajes": req.flash('mensajes')});
}
const loginUser = async(req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
      req.flash("mensajes", errors.array());
      return res.status(404).json({"mensajes": req.flash('mensajes')})
   }
   const { email, password } = req.body;
   try {
      let user = await Users.findOne({email});
      // console.log('Aqui estoy')
      if (!user) throw new Error('No existe este email');

      if(!(await user.comparePassword(password))) throw new Error('La contraseña no es correcta');
      // Crea la sesion de usuario a traves de passport
      
      const token = jwt.sign({id: user._id}, process.env.SECRETTK, {
         expiresIn: '5m'
      })

      return res.status(200).json({verificado: true, token});
   } catch (error) {
      req.flash("mensajes", [{msg: error.message}]);
      return res.status(404).json({"mensajes": req.flash('mensajes')})
   }
}

const cerrarSesion = (req, res, next) => {
   // console.log(req.user)
   return res.status(200).send({auth: false});
}

module.exports = {
   registerForm,
   crearUser,
   loginForm,
   loginUser,
   cerrarSesion
};