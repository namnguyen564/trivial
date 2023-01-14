
export function loggedIn(){
    
    window.localStorage.setItem("logged_in",true)
}

export function loggedOut(){
    axios
    .get("/users/deleteSession")
    .then(() => {
     
        window.localStorage.setItem("logged_in",false)
        console.log("hello")
        location.reload()
    })
   
}
