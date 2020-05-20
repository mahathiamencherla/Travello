const idea_btn = document.querySelector("#idea_btn")
const veto_btn = document.querySelector("#veto_btn")
const logout = document.querySelector("#logout")
const profile = document.querySelector("#profile")
const keep = document.querySelector(".keep-form-btn")
const close = document.querySelector(".close")
const delete_btn = document.querySelector("#del_button")
const background = document.querySelector("#background")
const listDisplay = document.querySelector('#listDisplay')
const table = document.querySelector("#ideaTable")
const submit_btn = document.querySelector("#submit")
const deleteAll = document.querySelector("#deleteAll")

let originalDest = ''
let ideaLength = 0
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
    if(event.key === 'Enter') {// show pop up only if idea list length > 0
        if(element.value.length === 0){
            window.alert("Destination cannot be empty")
        }
        else if(ideaLength > 0)
        {
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
                if (result.data.success === true){
                    location.reload()
                }else{                    
                    window.alert(result.data.error.message.replace(/.*:/,"").replace(/.*:/,""))  
                    location.reload()                  
                }      
            })
            document.getElementById("myForm").style.display = "none";
            editBox = document.getElementById("dst")
            editBox.readOnly = true
            editBox.style.backgroundColor = "#d76c7f"
            
        })

        delete_btn.addEventListener("click", (e) => {
            e.preventDefault()
            document.getElementById("listDisplay").style.display = "block";
            submit_btn.style.display = "block";
            document.getElementById("myForm").style.display = "none";
            axios ({
                method: 'patch',
                url: `/profile/${token}`,
                data: {
                    destination: element.value,
                    peopleCount,
                    email
                }
            }).then((result) => {
                if (result.data.success === false){              
                    window.alert(result.data.error.message.replace(/.*:/,"").replace(/.*:/,""))  
                    location.reload()                  
                }         
            })
            editBox.value = element.value
            editBox.readOnly = true
            editBox.style.backgroundColor = "#d76c7f"
        })
        close.addEventListener("click", (e) => {
            e.preventDefault()
            document.getElementById("myForm").style.display = "none";            
            editBox.value = originalDest
            editBox.readOnly = true
            editBox.style.backgroundColor = "#d76c7f"
        })
        } else {
            axios ({
                method: 'patch',
                url: `/profile/${token}`,
                data: {
                    destination: element.value,
                    peopleCount,
                    email
                }
            }).then((result) => {
                if (result.data.success === true){
                    location.reload()
                }else{                    
                    window.alert(result.data.error.message.replace(/.*:/,"").replace(/.*:/,""))  
                    location.reload()                  
                }         
            })
            editBox.value = element.value
            editBox.readOnly = true
            editBox.style.backgroundColor = "#d76c7f"
        }
    }
}

function edit(element){
    var destination= '', peopleCount= '', email=''
    if(event.key === 'Enter'){
        if(element.value.length === 0){
            if (element.id === 'grpno')
                window.alert("Number of people cannot be empty")
            else
                window.alert("Email cannot be empty")
        }else{
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
                    if (result.data.success === true){
                        location.reload()
                    }else{                    
                        window.alert(result.data.error.message.replace(/.*:/,"").replace(/.*:/,""))  
                        location.reload()                  
                    }                
                })
        }        
    }    
}

axios({
    method: 'get',
    url: `/idea/data/${token}`    
}).then((result) => {
    list = result.data
    ideaLength = list.length
    diplayList(list)    
})


const diplayList = function(list){
    list.forEach((idea) => {
        displayRow(idea)    
    })
}

const displayRow = function(idea){
        var description = idea.description        
        var cost = idea.cost
        var duration = idea.duration

        var row = table.insertRow(-1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)        
        var cell5 = row.insertCell(4)

        var btn = document.createElement('input')
        btn.setAttribute('type','checkbox')        
        btn.setAttribute('name','removeIdea')    
        btn.setAttribute('class','chkbtn')   
        btn.setAttribute('title','Click to delete')        
        btn.setAttribute('id',idea._id)                        
        cell2.innerText = description
        cell3.innerText = duration
        cell4.innerText = cost
        cell5.appendChild(btn)
}

function myFunction() { 
    if (deleteAll.checked == true){
        var x = document.getElementsByName("removeIdea");
        var i;
        for (i = 0; i < x.length; i++) {
            if (x[i].type == "checkbox") {
                x[i].checked = true;
            }
        }    
    }else{
        var x = document.getElementsByName("removeIdea");
        var i;
        for (i = 0; i < x.length; i++) {
            if (x[i].type == "checkbox") {
                x[i].checked = false;
            }
        }    
    }
}

submit_btn.addEventListener('click',(e) => {
    idList = []
    var x = document.getElementsByName("removeIdea");
        var i;
        for (i = 0; i < x.length; i++) {
            if (x[i].checked == true) {
                idList.push(x[i].id)   
            }
        }    
        console.log(idList) 
        axios ({
            method: 'delete',
            url: `/profile/idea/${token}`,
            data: {
                idList
            }
        }).then((result) => {
            console.log('success')
            location.reload()        
        })        
        
})