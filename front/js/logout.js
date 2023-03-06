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
            localStorage.removeItem('token')
            if ("token" in localStorage === false) {
               window.location = './login.html'
            }
         }
      })
})