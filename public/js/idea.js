const sub_btn = document.querySelector("#newIdeaBtn")
const newIdea = document.querySelector("#newIdea")
const cost = document.querySelector("#cost")
const table = document.querySelector("#ideaTable")



list = [
    {
        description: "idea 1" ,
        vetoCount: "4",
        cost: "200"
    },{
        description: "idea 2" ,
        vetoCount: "3",
        cost: "300"
    },{
        description: "idea 3" ,
        vetoCount: "1",
        cost: "400"
    },{
        description: "idea 4" ,
        vetoCount: "2",
        cost: "400"
    },
]

document.addEventListener("DOMContentLoaded", (e) => {
    list.forEach((idea) => {
        var description = idea.description
        var vetoCount = idea.vetoCount
        var cost = idea.cost

        var row = table.insertRow(-1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)        

        var btn = document.createElement('button')
        var bText = document.createTextNode('veto')
        btn.appendChild(bText)

        cell2.innerText = description
        cell3.innerText = cost
        cell4.appendChild(btn)
        
    })
}) 

sub_btn.addEventListener("click", (e) => {
    e.preventDefault()
    inputIdea = newIdea.value
    inputCost = cost.value
    //axios.post()
})