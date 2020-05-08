
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
      window.location.href = `/me/${result.data.token}`   
    }).catch((error) => {      
      msg.textContent = "Failed to join!"
  })      
})

