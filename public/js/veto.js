const arr = [
    "veto 1",
    "veto 2",
    "veto 3",
    "veto 4",
    "veto 5"
]

const ol = document.getElementById("veto-list")

document.addEventListener("DOMContentLoaded", (e) =>{     
    arr.forEach((idea) => {        
        const li = document.createElement("li")
        li.innerText = idea
        ol.append(li)        
    })
})

