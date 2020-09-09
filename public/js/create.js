const destination = document.querySelector("#dest")
const peopleCount = document.querySelector("#peopleCount")
const email = document.querySelector("#email")
const pwd = document.querySelector("#pwd")
const re_pwd = document.querySelector("#re_pwd")
const msg  = document.querySelector("#errorMessage")
const submit = document.querySelector("#submit")

document.getElementById("sub_but").addEventListener("click", (e) => { 
    e.preventDefault() 
    if (pwd.value != re_pwd.value){
        window.alert("Passwords do not match!")         
    }else{
        axios({
            method: 'post',
            url: '/create',
            data: {
                destination: destination.value,
                peopleCount: peopleCount.value,
                email: email.value,
                password: pwd.value
            }
            }).then((result) => {             
                if(result.data.success === false){                    
                    if(!result.data.error.code)
                        window.alert(result.data.error.message.replace(/.*:/,"").replace(/.*:/,""))  
                    else {
                        window.alert("An account with this email already exists!")   
                    }   
                } else {
                    if (!!result.data.error === "noEmail"){
                        window.alert("Could not send you your welcome mail!")
                    }                    
                    window.location.href = `/me/${result.data.token}`
                }                                                                                              
            })              
        }                  
    })          

    