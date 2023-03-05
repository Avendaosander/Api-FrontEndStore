const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const contactoSchema = new Schema({
   nombre: { 
      type: String,
      lowercase: true,
      required: true
   },
   apellido: {
      type: String,
      lowercase: true,
      required: true
   },
   email: {
      type: String,
      lowercase: true,
      required: true
   },
   mensaje: {
      type: String,
      required: true
   }
});

const Contacto = mongoose.model('Contacto', contactoSchema);
module.exports = Contacto;