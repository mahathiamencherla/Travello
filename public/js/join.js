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
      if (result.data.success === false){
        window.alert("Please enter valid credentials") 
      }    
      else {
        if (loginCheckBox.checked == true) {           
          Cookies.set('T_autoLogin',result.data.token,{ expires: 14 }) 
        }
        window.location.href = `/me/${result.data.token}`
      }         
    })
})