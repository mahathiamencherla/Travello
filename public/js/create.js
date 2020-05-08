// import axios from 'axios'


const destination = document.querySelector("#dest")
const peopleCount = document.querySelector("#peopleCount")
const pwd = document.querySelector("#pwd")
const re_pwd = document.querySelector("#re_pwd")
const msg  = document.querySelector("#errorMessage")
const submit = document.querySelector("#submit")

const illegalPassword = (error) => {
    destination.value = destination.value
    peopleCount.value = peopleCount.value
    pwd.value = ""
    re_pwd.value = ""
    msg.textContent = error
    console.log(error)
}

document.getElementById("sub_but").addEventListener("click", (e) => { 
    e.preventDefault() 
    if (pwd.value != re_pwd.value){
        illegalPassword("Passwords do not match")         
    }else{
        axios({
            method: 'post',
            url: '/create',
            data: {
                destination: destination.value,
                peopleCount: peopleCount.value,
                password: pwd.value
            }
            }).then((result) => {
                console.log(result.data.token)
                axios.get("/me", {
                    headers: {
                        'Authorization': `Bearer ${result.data.token}`
                    }                
                }).catch ((e) => {
                    msg.textContent = "Authentication failed.."  
                })
                window.location.href = '/me'
            }).catch ((e) => {
                msg.textContent = "Unable to create!"
            })              
        }                  
    })          