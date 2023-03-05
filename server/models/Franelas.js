const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const franelasSchema = new Schema({
   src: { 
      type: String,
      unique: true,
      required: true
   },
   nombre: {
      type: String,
      unique: true,
      required: true
   },
   descripcion: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   }
});

const Franelas = mongoose.model('Franelas', franelasSchema);
module.exports = Franelas