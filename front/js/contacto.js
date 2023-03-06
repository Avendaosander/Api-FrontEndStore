const url = window.location.origin;
const body = document.querySelector('body')
const navContacto = document.getElementById('contacto')
navContacto.classList.toggle('nav_enlace-activo')
const form = document.getElementById('formContacto')
form.addEventListener('submit', async e => {
   const nombre = document.getElementById('nombre')
   const apellido = document.getElementById('apellido')
   const email = document.getElementById('email')
   const message = document.getElementById('message')
   e.preventDefault();
   try {
      // console.log('Entra aqui')
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
            if(response.enviado == true) {
               alert('Su mensaje ha sido enviado')
               return location.href = `${url}/front/index.html`;
            }
         })
   } catch (error) {
      console.error(error)
   }
})