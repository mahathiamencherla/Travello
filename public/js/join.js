
const destination = document.querySelector("#dest")
const pwd = document.querySelector("#pwd")
const msg  = document.querySelector("#errorMessage")
const loginCheckBox =document.querySelector('#login')

function myFunction() {
  var x = document.getElementById("pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  } 
}


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
      if (loginCheckBox.checked == true) {  
        console.log(result.data.token, typeof result.data.token )     
        Cookies.set('T_autoLogin',result.data.token,{ expires: 14 }) 
      }
      window.location.href = `/me/${result.data.token}`        
    }).catch((error) => {      
      msg.textContent = "Failed to join!"
  })      
})