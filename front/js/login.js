const url = window.location.origin;
const body = document.querySelector('body')
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
               localStorage.setItem('token', JSON.stringify(response.token))
               return location.href = `${url}/front/index.html`;
            }
         })
   } catch (error) {
      console.error(error)
   }
})