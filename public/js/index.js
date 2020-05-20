function join(){
    console.log("join")

    loginToken = Cookies.get('T_autoLogin')
    if(!loginToken){
        window.location.href = "/join"
    }else{
        window.location.href = `/me/${loginToken}`     
    }
}