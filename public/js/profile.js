const idea_btn = document.querySelector("#idea_btn")
const veto_btn = document.querySelector("#veto_btn")
const logout = document.querySelector("#logout")
const profile = document.querySelector("#profile")

const pathname = window.location.pathname;
const token = pathname.replace("/profile/","")

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

profile.addEventListener("click", (e) => {    
    e.preventDefault()
    window.location.href = `/me/${token}`
})

function allowEdit(element){
    const id = element.id.replace("edit_","")    
    editBox = document.getElementById(id)
    editBox.readOnly = false
    editBox.style.backgroundColor = "#ffffff"

}

function edit(element){
    if(event.key === 'Enter'){
        const value = element.value    
        const id = element.id
        console.log(value,id)
        editBox = document.getElementById(id)
        editBox.readOnly = true
        editBox.style.backgroundColor = "#d76c7f"        
        //axios patch
    }    
}