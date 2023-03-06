const url = window.location.origin;
const navNosotros = document.getElementById('nosotros')
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