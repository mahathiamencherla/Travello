const table = document.querySelector("#vetoTable")
const logout = document.querySelector("#logout")
const profile = document.querySelector("#profile")
const pathname = window.location.pathname;
const token = pathname.replace("/veto/","")

axios({
    method: 'get',
    url: `data/${token}`    
}).then((result) => {
    list = result.data
    diplayList(list)    
})

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

const diplayList = function(list){
    list.forEach((idea) => {
        displayRow(idea)    
    })
}

const displayRow = function(idea){
    var description = idea.description        

    var row = table.insertRow(-1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)            

    cell2.innerText = description 
}