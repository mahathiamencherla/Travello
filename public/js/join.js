
const destination = document.querySelector("#dest")
const pwd = document.querySelector("#pwd")
const msg  = document.querySelector("#errorMessage")

document.getElementById("sub_but").addEventListener("click", (e) => { 
    e.preventDefault()      
    axios({
      method: 'post',
      url: '/join',
      data: {
        destination: destination.value,
        password: pwd.value
      }
    }).then((result) => {
      console.log(result.data.token)
      axios.get("/me", {
          headers: {
              'Authorization': `Bearer ${result.data.token}`
          }                
      }).catch ((e) => {
          msg.textContent = "Authorization failed"    //remove this when deploying
      })
      window.location.href = '/me'       
    }).catch((error) => {      
      msg.textContent = "Failed to join!"
  })      
})

