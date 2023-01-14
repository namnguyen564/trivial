import{rederNav} from './renderNavBar.js'
import{loggedIn} from './userStatus.js'
import { renderLoginPage } from "./renderLoginPage.js";

export function verifyLogin(){
    const middle = document.getElementById("middle-nav");
    const loginForm = document.getElementById("login-form")
    const errorMsg = document.getElementById("error-msg");
    


    loginForm.addEventListener("submit", function(event){
        event.preventDefault();

        const loginFormData = new FormData(loginForm)


        const data = {
            email: loginFormData.get("email"),
            password_hash: loginFormData.get("password")
        }

        console.log(data)

        axios
            .post("/users/login", data)
            .then((response) =>{
                console.log("what")
                // header.innerHTML =  `
                // <h1>Signed In Mate</h1>
                // `
                console.log("front end response:",response)
                console.log(response.status)
                if(response.data.status == "Incorrect Email or Password"){
                    errorMsg.innerText = "Incorrect Email or Password"
                } else if (response.data.status == "Correct Login"){
                    loggedIn()
                    renderLoginPage()
                  
                 }
                // if(response.status == false){

                //     errorMsg.innerText = "Incorrect Password or Email"
                // } 
                // location.reload()

            })
            // .catch((err) =>{
            //     console.log(err)
            // })

    })



}