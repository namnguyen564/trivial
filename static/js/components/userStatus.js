
export function loggedIn(){
    
    window.sessionStorage.setItem("logged_in",true)
}

export function loggedOut(){
    axios
    .get("/users/deleteSession")
    .then(() => {
        console.log("loggedOut")
        window.sessionStorage.setItem("logged_in",false)
        
        location.reload()
    })
   
}
