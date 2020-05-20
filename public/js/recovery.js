const pwd = document.querySelector("#pwd")
const re_pwd = document.querySelector("#re_pwd")
const sub_btn = document.querySelector("#sub_but")
const pathname = window.location.pathname;
const token = pathname.replace("/recovery/","")

sub_btn.addEventListener("click", (e) =>{
    e.preventDefault()
    if(pwd.value !== re_pwd.value){
        window.alert("Passwords dont match!")
    }else{
        axios({
            method: 'patch',
            url: `/recovery/${token}`,
            data: {
              pwd:pwd.value
            }
        }).then((result) => {          
            if (result.data.success === false){
                console.log(result.data.error)
                window.alert("Could not update password. Try again later!")
            }else{
                window.location.href = `/me/${token}`
            }
        })
    }
})
