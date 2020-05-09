const arr = [
    "idea 1",
    "idea 2",
    "idea 3",
    "idea 4",
    "idea 5"
]

const ol = document.getElementById("idea-list")
const btn = document.getElementById("btn")

document.addEventListener("DOMContentLoaded", (e) =>{     
    arr.forEach((idea) => {        
        const li = document.createElement("li")
        li.innerText = idea
        ol.append(li)        
    })
})

