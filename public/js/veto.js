const table = document.querySelector("#vetoTable")

list = [
    {
        description: "veto 1" ,
        vetoCount: "4",
        cost: "200"
    },{
        description: "veto 2" ,
        vetoCount: "3",
        cost: "300"
    },{
        description: "veto 3" ,
        vetoCount: "1",
        cost: "400"
    },{
        description: "veto 4" ,
        vetoCount: "2",
        cost: "400"
    },
]

document.addEventListener("DOMContentLoaded", (e) => {
    list.forEach((idea) => {
        var description = idea.description        

        var row = table.insertRow(-1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)            

        cell2.innerText = description                
    })
}) 