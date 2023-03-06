const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');

const userSchema = new Schema({
   nombre: { 
      type: String,
      lowercase: true,
      required: true
   },
   email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   }
});

userSchema.pre('save', async function(next){
   const user = this;
   if(!user.isModified('password')) return next

   try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(user.password, salt) 

      user.password = hash;
      next();

   } catch (error) {
      console.log(error);
      throw new Error('Error al modificar la contraseña');
   }
})

userSchema.methods.comparePassword = async function(confirmPassword){
   return await bcrypt.compare(confirmPassword, this.password)
}

const Users = mongoose.model('Users', userSchema);
module.exports = Users;