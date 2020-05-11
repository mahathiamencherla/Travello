const pathname = window.location.pathname;
const token = pathname.replace("/me/","")

const idea_btn = document.querySelector("#idea")
const veto_btn = document.querySelector("#veto")

idea_btn.addEventListener("click", (e) => {    
    e.preventDefault()    
    window.location.href = `/idea/${token}`
    
})
