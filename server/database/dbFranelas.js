const Franelas = require('../models/Franelas') // Agregar Modelo

function addFranelas() {
  Franelas.insertMany([
    {
       "src": "img/1.jpg",
       "nombre": "VueJS",
       "price": "25",
       "descripcion": "Vue.js es un framework de JavaScript de código abierto para la construcción de interfaces de usuario y aplicaciones de una sola página"
    },{
       "src": "img/2.jpg",
       "nombre": "AngularJS",
       "price": "25",
       "descripcion": "Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página"
    },{
       "src": "img/3.jpg",
       "nombre": "ReactJS",
       "price": "30",
       "descripcion": "React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página"
    },{
       "src": "img/4.jpg",
       "nombre": "Redux",
       "price": "18",
       "descripcion": "Redux es una librería JavaScript de código abierto para el manejo del estado de las aplicaciones. Es comúnmente usada con otras librerías como React o Angular para la construcción de Interfaces de Usuario"
    },{
       "src": "img/5.jpg",
       "nombre": "NodeJS",
       "price": "30",
       "descripcion": "Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript"
    },{
       "src": "img/6.jpg",
       "nombre": "SASS",
       "price": "25",
       "descripcion": "Sass es un lenguaje de hoja de estilos en cascada inicialmente diseñado por Hampton Catlin y desarrollado por Natalie Weizenbaum."
    },{
       "src": "img/7.jpg",
       "nombre": "HTML5",
       "price": "20",
       "descripcion": "HTML 5 es la quinta revisión importante del lenguaje básico de la World Wide Web"
    },{
       "src": "img/8.jpg",
       "nombre": "Github",
       "price": "30",
       "descripcion": "GitHub es una forja para alojar proyectos utilizando el sistema de control de versiones Git"
    },{
       "src": "img/9.jpg",
       "nombre": "Bulma CSS",
       "price": "20",
       "descripcion": "Bulma es un marco gratuito de código abierto que proporciona componentes frontend listos para usar que puede combinar fácilmente para crear interfaces web receptivas"
    },{
       "src": "img/10.jpg",
       "nombre": "Typescript",
       "price": "25",
       "descripcion": "TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases"
    },{
       "src": "img/11.jpg",
       "nombre": "Drupal",
       "price": "20",
       "descripcion": "Drupal es un sistema de gestión de contenidos o CMS libre, ​ modular, multipropósito y muy configurable que permite publicar artículos, imágenes, archivos y que también ofrece la posibilidad de otros servicios añadidos como foros, encuestas, votaciones, blogs, administración de usuarios y permisos"
    },{
       "src": "img/12.jpg",
       "nombre": "Javascript",
       "price": "30",
       "descripcion": "JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, ​ basado en prototipos, imperativo, débilmente tipado y dinámico"
    },{
       "src": "img/13.jpg",
       "nombre": "GraphQL",
       "price": "25",
       "descripcion": "GraphQL es un lenguaje de consulta y manipulación de datos para APIs, y un entorno de ejecución para realizar consultas con datos existentes.​"
    },{
       "src": "img/14.jpg",
       "nombre": "Wordpress",
       "price": "20",
       "descripcion": "WordPress es un sistema de gestión de contenidos lanzado el 27 de mayo de 2003, enfocado a la creación de cualquier tipo de página web"
    }
  ]);
}

module.exports = addFranelas