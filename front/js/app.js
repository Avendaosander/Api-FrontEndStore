const url = window.location.origin;
const urlActual = document.URL;
const navTienda = document.getElementById('tienda') 
const navNosotros = document.getElementById('nosotros') 
const navContacto = document.getElementById('contacto') 
const body = document.querySelector('body')

console.log('JS desde el front');

if (urlActual == `${url}/front/index.html`) {
   navTienda.classList.toggle('nav_enlace-activo')
   document.addEventListener('DOMContentLoaded', async e => {
      await fetch('http://localhost:3000', { 
         method: 'GET',
         headers: { 
            "Content-Type": "application/json"
         } 
      })
         .then(res => res.json())
         .then(response => {
            // console.log(response)
            if (response.authLogin == false) {
               // console.log('No login');
               return location.href = `${url}/front/login.html`;
            } else{
               response.forEach(franela => {
                  const main = document.querySelector('.grid') 
                  const producto = document.createRange().createContextualFragment(/*html*/
                     `<article class="producto">
                        <a href="producto.html?id=${franela._id}">
                           <figure>
                              <img class="producto_imagen" src=${franela.src} alt="Imagen camisa">
                              <figcaption class="producto_nombre">${franela.nombre}</figcaption>
                              <div>
                                 <p class="producto_precio">$${franela.price}</p>
                              </div>
                           </figure>
                        </a>
                     </article>`
                  )
                  main.append(producto);
               })
            }
         })
   })
}

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
if (urlActual == `${url}/front/producto.html?id=${productId}`) {
   let precio = 0;
   document.addEventListener('DOMContentLoaded', async e => {
      await fetch(`http://localhost:3000/producto/${productId}`, { 
         method: 'GET',
         headers: { 
            "Content-Type": "application/json"
         } 
      })
      .then(res => res.json())
         .then(response => {
            if (response.authLogin == false) {
               return location.href = `${url}/front/login.html`;
            }
            precio = response.price
            const main = document.querySelector('.contenedor') 
            const producto = document.createRange().createContextualFragment(/*html*/
               `<h2>${response.nombre}</h2>

               <section class="camisa">
                  <img src=${response.src} alt="Imagen del producto" >
         
                  <article class="camisa_contenido">
                        <p>${response.descripcion}</p>
                        <p class="precio">Precio: $${response.price}</p>
                        <p id="total">Total: $${response.price}</p>
         
                        <form class="formulario">
                           <select class="formulario_campo" name="talla" id="talla">
                              <option disabled selected>--Seleccionar Talla--</option>
                              <option>Chica</option>
                              <option>Mediana</option>
                              <option>Grande</option>
                           </select>
         
                           <input class="formulario_campo" name="cantidad" id="cantidad" type="number" placeholder="Cantidad" min="1" max="12" value='1'>
                           
                           <input class="formulario_submit" type="submit" value="Agregar al Carrito">
                        </form>
                  </article>
               </section>`
            )
            main.append(producto);
         })
         const cantidad = document.getElementById('cantidad');
      
         if (cantidad != null) {
            cantidad.addEventListener('change', e => {
               let operacion = Number(e.target.value)
               document.getElementById('total').innerHTML = `Total: $${precio * operacion}`
            })
         }

         const form = document.querySelector('.formulario')
         form.addEventListener('submit', async e => {
            e.preventDefault();
            try {
               alert('Su pedido se ha enviado a la oficina')
            } catch (error) {
               console.log(error)
               return location.href = `${url}/front/index.html`;
            }
         })
   })
}

if (urlActual == `${url}/front/login.html`) {
   body.classList.toggle('contenedorAuth')
   const form = document.getElementById('formLogin')
   const email = document.getElementById('email')
   const password = document.getElementById('password')
   form.addEventListener('submit', async e => {
      e.preventDefault();
      try {
         // console.log('Entra aqui')
         await fetch('http://localhost:3000/login', { 
            method: 'POST',
            headers: { 
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
               email: email.value,
               password: password.value
            })
         })
            .then(res => res.json())
            .then(response => {
               let errores = document.querySelector('.errores')
               // console.log(errores)
               if(errores != null){
                  errores.remove();
               }
               // console.log(response)
               if (response.mensajes) {
                  const contErrors = document.createRange().createContextualFragment(/*html*/
                     `<section class="errores">
                     </section>`
                  )
                  body.append(contErrors);
                  return response.mensajes.forEach(error => {
                     errores = document.querySelector('.errores') 
                     const modalErr = document.createRange().createContextualFragment(/*html*/
                        `<div id="modal">
                           <p class="msg-error">${error.msg}</p>
                           <i class="fa-solid fa-xmark close"></i>
                        </div>`
                     )
                     errores.append(modalErr);

                     const listaErrores = document.querySelector('.errores')

                     listaErrores.childNodes.forEach(modal => {
                        modal.addEventListener('click', e => {
                           e.target.classList.forEach(clase => {
                              if (clase == 'close') {
                                 modal.remove()
                              }
                           })
                        })
                     })
                  })
               }
               if(response.verificado == true) {
                  return location.href = `${url}/front/index.html`;
               }
            })
      } catch (error) {
         console.error(error)
      }
   })
}

// Si req.flash() funcionara (El mismo codigo aplicaria para register, pero con sus respectivas funciones)
// if (urlActual == `${url}/front/login.html`) {
//    const form = document.getElementById('formLogin')
//    const email = document.getElementById('email')
//    const password = document.getElementById('password')
//    document.addEventListener('DOMContentLoaded', async e => {
//       await fetch('http://localhost:3000/login', { 
//          method: 'GET',
//          headers: { 
//             "Content-Type": "application/json"
//          }
//       })
//          .then(res => res.json())
//          .then(response => {
//             let errores = document.querySelector('.errores')
//             // console.log(errores)
//             if(errores != null){
//                errores.remove();
//             }
//             // console.log(response)
//             if (response.mensajes) {
//                const contErrors = document.createRange().createContextualFragment(/*html*/
//                   `<section class="errores">
//                   </section>`
//                )
//                body.append(contErrors);
//                return response.mensajes.forEach(error => {
//                   errores = document.querySelector('.errores') 
//                   const modalErr = document.createRange().createContextualFragment(/*html*/
//                      `<div id="modal">
//                         <p class="msg-error">${error.msg}</p>
//                         <i class="fa-solid fa-xmark close"></i>
//                      </div>`
//                   )
//                   errores.append(modalErr);
   
//                   const listaErrores = document.querySelector('.errores')
   
//                   listaErrores.childNodes.forEach(modal => {
//                      modal.addEventListener('click', e => {
//                         e.target.classList.forEach(clase => {
//                            if (clase == 'close') {
//                               modal.remove()
//                            }
//                         })
//                      })
//                   })
//                })
//             }
//             if(response.verificado == true) {
//                return location.href = `${url}/front/index.html`;
//             }
//          })
//       form.addEventListener('submit', async e => {
//          e.preventDefault();
//          try {
//             // console.log('Entra aqui')
//             await fetch('http://localhost:3000/login', { 
//                method: 'POST',
//                headers: { 
//                   "Content-Type": "application/json"
//                },
//                body: JSON.stringify({ 
//                   email: email.value,
//                   password: password.value
//                })
//             })
//                .then(res => res.json())
//                .then(response => {
//                   console.log(response)
//                   if(response.verificado == true) {
//                      return location.href = `${url}/front/index.html`;
//                   }
//                })
//          } catch (error) {
//             console.error(error)
//          }
//       })
//    })
// }

if (urlActual == `${url}/front/register.html`) {
   body.classList.toggle('contenedorAuth')
   const form = document.getElementById('formRegister')
   const email = document.getElementById('email')
   const password = document.getElementById('password')
   const repeatPassword = document.getElementById('repeatPassword')
   form.addEventListener('submit', async e => {
      e.preventDefault();
      try {
         // console.log('Entra aqui')
         await fetch('http://localhost:3000/register', { 
            method: 'POST',
            headers: { 
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
               nombre: nombre.value,
               email: email.value,
               password: password.value,
               repeatPassword: repeatPassword.value
            })
         })
            .then(res => res.json())
            .then(response => {
               let errores = document.querySelector('.errores')
               // console.log(errores)
               if(errores != null){
                  errores.remove();
               }
               // console.log(response)
               if (response.mensajes) {
                  const contErrors = document.createRange().createContextualFragment(/*html*/
                     `<section class="errores">
                     </section>`
                  )
                  body.append(contErrors);
                  return response.mensajes.forEach(error => {
                     errores = document.querySelector('.errores') 
                     const modalErr = document.createRange().createContextualFragment(/*html*/
                        `<div id="modal">
                           <p class="msg-error">${error.msg}</p>
                           <i class="fa-solid fa-xmark close"></i>
                        </div>`
                     )
                     errores.append(modalErr);

                     const listaErrores = document.querySelector('.errores')

                     listaErrores.childNodes.forEach(modal => {
                        modal.addEventListener('click', e => {
                           e.target.classList.forEach(clase => {
                              if (clase == 'close') {
                                 modal.remove()
                              }
                           })
                        })
                     })
                  })
               }
               if(response.verificado == true) {
                  return location.href = `${url}/front/index.html`;
               }
            })
      } catch (error) {
         console.error(error)
      }
   })
}

if (urlActual == `${url}/front/contacto.html`) {
   navContacto.classList.toggle('nav_enlace-activo')
   document.addEventListener('DOMContentLoaded', async e => {
      await fetch(`http://localhost:3000/contacto`, { 
         method: 'GET',
         headers: { 
            "Content-Type": "application/json"
         } 
      })
         .then(res => res.json())
         .then(response => {
            if (response.authLogin == false) {
               return location.href = `${url}/front/login.html`;
            }
            const form = document.getElementById('formContacto')
            const nombre = document.getElementById('nombre')
            const apellido = document.getElementById('apellido')
            const email = document.getElementById('email')
            const message = document.getElementById('message')
            form.addEventListener('submit', async e => {
               e.preventDefault();
               try {
                  console.log('Entra aqui')
                  await fetch('http://localhost:3000/contacto', { 
                     method: 'POST',
                     headers: { 
                        "Content-Type": "application/json"
                     },
                     body: JSON.stringify({ 
                        nombre: nombre.value,
                        apellido: apellido.value,
                        email: email.value,
                        mensaje: message.value
                     })
                  })
                     .then(res => res.json())
                     .then(response => {
                        let errores = document.querySelector('.errores')
                        // console.log(errores)
                        if(errores != null){
                           errores.remove();
                        }
                        // console.log(response)
                        if (response.mensajes) {
                           const contErrors = document.createRange().createContextualFragment(/*html*/
                              `<section class="errores">
                              </section>`
                           )
                           body.append(contErrors);
                           return response.mensajes.forEach(error => {
                              errores = document.querySelector('.errores') 
                              const modalErr = document.createRange().createContextualFragment(/*html*/
                                 `<div id="modal">
                                    <p class="msg-error">${error.msg}</p>
                                    <i class="fa-solid fa-xmark close"></i>
                                 </div>`
                              )
                              errores.append(modalErr);

                              const listaErrores = document.querySelector('.errores')

                              listaErrores.childNodes.forEach(modal => {
                                 modal.addEventListener('click', e => {
                                    e.target.classList.forEach(clase => {
                                       if (clase == 'close') {
                                          modal.remove()
                                       }
                                    })
                                 })
                              })
                           })
                        }
                        if(response.auth == true) {
                           return location.href = `${url}/front/contacto.html`;
                        }
                     })
               } catch (error) {
                  console.error(error)
               }
            })
         })
   })
}

if (urlActual == `${url}/front/nosotros.html`) {
   navNosotros.classList.toggle('nav_enlace-activo')
   document.addEventListener('DOMContentLoaded', async e => {
      await fetch(`http://localhost:3000/nosotros`, { 
         method: 'GET',
         headers: { 
            "Content-Type": "application/json"
         } 
      })
         .then(res => res.json())
         .then(response => {
            if (response.authLogin == false) {
               return location.href = `${url}/front/login.html`;
            }
         })
   })
}

if (!(urlActual == `${url}/front/login.html` || urlActual == `${url}/front/register.html`)) {
   document.getElementById('logout').addEventListener('click', async e => {
      await fetch(`http://localhost:3000/logout`, { 
         method: 'GET',
         headers: { 
            "Content-Type": "application/json"
         } 
      })
         .then(res => res.json())
         .then(response => {
            if (response.auth == false) {
               return location.href = `${url}/front/login.html`;
            }
         })
   })
}