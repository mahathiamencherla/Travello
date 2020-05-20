const destination = document.querySelector("#dest")
const email = document.querySelector("#email")
const sub_but = document.querySelector("#sub_but")

sub_but.addEventListener("click", (e) => {
    e.preventDefault()
    axios({
        method: 'post',
        url: '/forgotPass',
        data: {
            destination: destination.value,
            email: email.value
        }
    }).then((result) => {
        if(result.data.success === false) {
            window.alert(result.data.error)
        } else if(result.data.server === false) {
            window.alert("Mail server down.. try in a while.")
        } else {
            window.alert("Email for password recovery has been sent to the admin!")
        }
    })
})