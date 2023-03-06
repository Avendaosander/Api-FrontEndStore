const url = window.location.origin;
const urlActual = document.URL;
const navTienda = document.getElementById('tienda')  

console.log('JS desde el front');

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
                           <p class="producto_precio">$${franela.price}</p>
                        </figure>
                     </a>
                  </article>`
               )
               main.append(producto);
            })
         }
      })
})