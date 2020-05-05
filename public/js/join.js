const createForm = document.querySelector('form')
const destination = document.querySelector("#dest")
const pwd = document.querySelector("#pwd")
const msg  = document.querySelector("#errorMessage")

createForm.addEventListener("submit", (e) => {
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

