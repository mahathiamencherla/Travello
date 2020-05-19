const pathname = window.location.pathname;
const token = pathname.replace("/me/","")
const logout = document.querySelector("#logout")
const idea_btn = document.querySelector("#idea")
const veto_btn = document.querySelector("#veto")
const profile = document.querySelector("#profile")
const modal = document.querySelector("#myModal")
const share_btn = document.querySelector(".Sbtn")
const close = document.querySelector(".close")
const url = document.querySelector("#url")
const change_email = document.querySelector("#change_email")

url.value = window.location.href

new ClipboardJS('.btn')

idea_btn.addEventListener("click", (e) => {    
    e.preventDefault()    
    window.location.href = `/idea/${token}`    
})

veto_btn.addEventListener("click", (e) => {    
    e.preventDefault()    
    window.location.href = `/veto/${token}`    
})

profile.addEventListener("click", (e) => {    
    e.preventDefault()    
    window.location.href = `/profile/${token}`    
})

change_email.addEventListener("click", (e) => {    
    e.preventDefault()    
    window.location.href = `/profile/${token}`    
})

logout.addEventListener("click", (e) => {  
    e.preventDefault()
    axios({
        method: 'post',
        url: `/logout/${token}`
    }).then((result) => {
        console.log(result.data.success)
        if(result.data.success === true) {
            window.location.href = `/logout/success`  
        } else {
            window.location.href = `/logout/failure`
        }
    })
    
})

share_btn.addEventListener("click", (e) => {
    e.preventDefault()
    myForm1.style.display = "block";
})

close.addEventListener("click", (e) => {
    e.preventDefault()
    myForm1.style.display = "none";
})
 
window.onclick = function(event) {   //If user clicks anywhere outside of the modal, close it
    if (event.target == myForm1) {
        myForm1.style.display = "none";
    }
  }

change_button.addEventListener("click", (e) => {
    e.preventDefault()
    axios({
        method: 'patch',
        url: `/me/${token}`,
        data: {
            email: email_change.value
        }
    }).then((result) => {
        window.location.href = `/me/${token}`
        document.getElementById("myForm").style.display = "none";
    }).catch((e) => {
        window.alert('Can\'t update! Try again..')
    })
})