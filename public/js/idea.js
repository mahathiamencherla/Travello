const sub_btn = document.querySelector("#newIdeaBtn")
const idea_btn = document.querySelector("#idea_btn")
const veto_btn = document.querySelector("#veto_btn")
const logout = document.querySelector("#logout")
const newIdea = document.querySelector("#newIdea")
const cost = document.querySelector("#cost")
const time = document.querySelector("#time")
const table = document.querySelector("#ideaTable")

const pathname = window.location.pathname;
const token = pathname.replace("/idea/","")

axios({
    method: 'get',
    url: `data/${token}`    
}).then((result) => {
    list = result.data
    diplayList(list)    
})


sub_btn.addEventListener("click", (e) => {
    e.preventDefault()
    inputIdea = newIdea.value    
    inputCost = !cost.value ? 0 : cost.value 
    inputTime = !time.value ? 0 : time.value 

    axios({
        method: 'post',
        url: `/idea/${token}`,
        data: {
          description: inputIdea,
          cost: inputCost,
          duration: inputTime
        }
      }).then((result) => {
          newIdea.value = ""
          cost.value = ""
          time.value = ""
          idea = result.data
          console.log(idea)
          displayRow(idea)          
      })
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

        var btn = document.createElement('button')
        var bText = document.createTextNode('veto')
        btn.appendChild(bText)
        btn.title = "Click to veto idea"

        cell2.innerText = description
        cell3.innerText = duration
        cell4.innerText = cost
        cell5.appendChild(btn)
}