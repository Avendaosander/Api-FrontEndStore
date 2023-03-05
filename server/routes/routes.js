const express = require('express');
const { body } = require('express-validator')
const { crearUser, loginUser, loginForm, registerForm, cerrarSesion } = require('../controllers/authController');
const { traerFranelas, verFranela, crearContacto, contactoForm, nosotros } = require('../controllers/tiendaController');
// const verificarUser = require('../middlewares/verificarUser');
//Esta deberia ser la verificacion de las sesiones, ejemplo: router.get('/', verificarUser, traerFranelas)
const router = express.Router()

router.get('/', traerFranelas)

router.get('/register', registerForm)
router.post('/register',[
   body("nombre", "Ingrese un nombre")
      .trim()
      .notEmpty()
      .isLength({ min: 2 })
      .escape(),
   body("email", "Ingrese un email válido")
      .trim()
      .isEmail(),
   body("password", "Contraseña debe tener 8 o más carácteres")
      .trim()
      .isLength({ min: 8 })
      .escape()
      .custom((value, { req }) => {
         if (value !== req.body.repeatPassword) {
            throw new Error("Contraseñas no coinciden");
         } else {
            return value;
         }
      }),
], crearUser);

router.get('/login', loginForm)
router.post('/login',[
   body("email", "Ingrese un email válido")
      .trim()
      .isEmail(),
   body("password", "Contraseña debe tener 8 o más carácteres")
      .trim()
      .isLength({ min: 8 })
      .escape()
], loginUser);

router.get('/nosotros', nosotros)

router.get('/contacto', contactoForm)
router.post('/contacto', [
   body("nombre", "Ingrese un nombre")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2 }),
   body("apellido", "Ingrese un apellido")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2 }),
   body("email", "Ingrese un email válido")
      .trim()
      .isEmail(),
   body("mensaje", "Mensaje debe tener 18 o más carácteres")
      .trim()
      .isLength({ min: 18 })
      .escape()
], crearContacto)

router.get('/producto/:id', verFranela)

router.get('/logout', cerrarSesion);

module.exports = router