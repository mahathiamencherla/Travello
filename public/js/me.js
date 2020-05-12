const pathname = window.location.pathname;
const token = pathname.replace("/me/","")
const logout = document.querySelector("#logout")
const idea_btn = document.querySelector("#idea")
const veto_btn = document.querySelector("#veto")
const modal = document.querySelector("#myModal")
const share_btn = document.querySelector("#share_btn")
const close = document.querySelector(".close")
const url = document.querySelector("#url")

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
    modal.style.display = "block";
})

close.addEventListener("click", (e) => {
    e.preventDefault()
    modal.style.display = "none";
})
 
window.onclick = function(event) {   //If user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }