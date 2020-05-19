const idea_btn = document.querySelector("#idea_btn")
const veto_btn = document.querySelector("#veto_btn")
const logout = document.querySelector("#logout")
const profile = document.querySelector("#profile")
const keep = document.querySelector(".keep-form-btn")
const close = document.querySelector(".close")
const delete_btn = document.querySelector("#del_button")
const background = document.querySelector("#background")

let originalDest = ''
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
    originalDest = editBox.value
    editBox.style.backgroundColor = "#ffffff"

}

function editDest(element) {
    var destination = '', peopleCount='', email=''
    if(event.key === 'Enter') {
        document.getElementById("myForm").style.display = "block";
        keep.addEventListener("click", (e) => {
            e.preventDefault()
            axios ({
                method: 'patch',
                url: `/profile/${token}`,
                data: {
                    destination: element.value,
                    peopleCount,
                    email
                }
            }).then((result) => {
                console.log('success')
                location.reload()        
            })
            document.getElementById("myForm").style.display = "none";
            editBox = document.getElementById("dst")
            editBox.readOnly = true
            editBox.style.backgroundColor = "#d76c7f"
            
        })

        // delete_btn.addEventListener("click", (e) => {
        //     e.preventDefault()
        // })
        close.addEventListener("click", (e) => {
            e.preventDefault()
            document.getElementById("myForm").style.display = "none";
            editBox.value = originalDest
            editBox.readOnly = true
            editBox.style.backgroundColor = "#d76c7f"
        })
    }
}

function edit(element){
    var destination= '', peopleCount= '', email=''
    if(event.key === 'Enter'){
        const value = element.value    
        const id = element.id
        editBox = document.getElementById(id)
        editBox.readOnly = true
        editBox.style.backgroundColor = "#d76c7f"
        if (id === 'grpno') {
            peopleCount = value
        }  else {
            email = value
        } 
        
            axios ({
                method: 'patch',
                url: `/profile/${token}`,
                data: {
                    destination,
                    peopleCount,
                    email
                }
            }).then((result) => {
                console.log('success')
                location.reload()        
            })
        
    }    
}
