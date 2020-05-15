const idea_btn = document.querySelector("#idea_btn")
const veto_btn = document.querySelector("#veto_btn")

const destination = document.querySelector("#dst")
const grpno = document.querySelector("#grpno")
const email = document.querySelector("#email")

const dst_btn = document.querySelector("edit_dst")
const grpno_btn = document.querySelector("edit_grpno")
const email_btn = document.querySelector("edit_email")

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

function allowEdit(element){
    const id = element.id.replace("edit_","")
    console.log(id)
    editBox = document.getElementById(id)
    editBox.readOnly = false
    editBox.style.backgroundColor = "#a2f78d"

}

function edit(element){
    if(event.key === 'Enter'){
        const value = element.value    
        const id = element.id
        editBox = document.getElementById(id)
        editBox.readOnly = true
        editBox.style.backgroundColor = "#ffffff"
        console.log(id,value)
        //run one if loop to edit the corresponding values
    }    
}


