const Franelas = require('../models/Franelas') // Agregar Modelo
const Contacto = require('../models/Contacto') // Agregar Modelo
const { validationResult } = require('express-validator');

const traerFranelas = async(req, res) => {
   try {
      const franelas = await Franelas.find().lean();
      // console.log(franelas);
      res.status(200).send(franelas);
   } catch (error) {
      console.log(error);
      res.status(404).send('Fallo algo...');
   }
}

const verFranela = async(req, res) => {
   const {id} = req.params;
   try {
      const franela = await Franelas.findById(id).lean();
      // console.log(franela);
      res.status(200).send(franela);
   } catch (error) {
      console.log(error);
      res.status(404).send('Fallo algo...');
   }
}

const nosotros = (req, res) => {
   res.status(200).send({authLogin: true});
}

const contactoForm = (req, res) => {
   res.status(200).send({authLogin: true});
}
const crearContacto = async(req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
      req.flash("mensajes", errors.array());
      return res.status(404).send({"mensajes": req.flash('mensajes')})
   }
   const { nombre, apellido, email, mensaje } = req.body;
   try {
      const contacto = new Contacto({nombre, apellido, email, mensaje});
      // console.log(contacto);
      await contacto.save();
      res.status(200).send({auth: true});
   } catch (error) {
      req.flash("mensajes", errors.array());
      res.status(404).send({"mensajes": req.flash('mensajes')})
   }
}

module.exports = {
   traerFranelas,
   verFranela,
   nosotros,
   contactoForm,
   crearContacto
}