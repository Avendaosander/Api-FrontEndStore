const mongoose = require('mongoose');
const Franelas = require('../models/Franelas') // Agregar Modelo
const addFranelas = require('./dbFranelas') // Agregar Franelas

mongoose.set('strictQuery', false)

mongoose.connect(process.env.URI) 
   .then(async()=> {
      const franelas = await Franelas.find().lean();
      if (franelas.length == 0) {
         addFranelas();
         console.log('Franelas Agregadas')
      }
      console.log('DB Conectada')
   })
   .catch((e) => console.log("Fallo de Conexion " + e));