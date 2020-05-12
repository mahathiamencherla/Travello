const pathname = window.location.pathname;
const token = pathname.replace("/me/","")
const logout = document.querySelector("#logout")
const idea_btn = document.querySelector("#idea")
const veto_btn = document.querySelector("#veto")

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
