const url = window.location.origin;
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
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
            return location.href = `${url}/front/index.html`;
         } catch (error) {
            console.log(error)
            return location.href = `${url}/front/index.html`;
         }
      })
})