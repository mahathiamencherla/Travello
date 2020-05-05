
const destination = document.querySelector("#dest")
const pwd = document.querySelector("#pwd")
const msg  = document.querySelector("#errorMessage")

document.getElementById("sub_but").addEventListener("click", (e) => { 
    e.preventDefault()         
    
    try {
        axios({
            method: 'post',
            url: '/join',
            data: {
              destination: destination.value,
              password: pwd.value
            }
          })
        console.log("Success")
        msg.textContent = "Success!"
    } catch (error) {
        console.log("Failed to join")
        msg.textContent = "Failed to join!"
    }

        
})

