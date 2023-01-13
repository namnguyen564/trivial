import{rederNav} from './renderNavBar.js'
import{loggedIn} from './userStatus.js'


import { renderLoginPage } from "./renderLoginPage.js";

export function renderSignUpPage() {
    const header = document.getElementById("header-nav");
    const errorMsg = document.getElementById("error-msg")

    header.innerHTML = `
    <h1>Sign Up Page</h1>

    `
    const signUpForm = document.createElement("form")
    signUpForm.innerHTML = `
    
    <input type="text" id="name" name="name" placeholder="Name">
    <input type="text" id="email" name="email" placeholder="Email">
    <input type="password" id="password" name="password" placeholder="Password">
    <input type="submit" value="Sign Up" id="sign-up-form-submit">
    `

    // signUpForm.setAttribute("method", "POST")
    header.appendChild(signUpForm)

    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const signUpData = new FormData(signUpForm)

        const data = {
            name: signUpData.get("name"),
            email: signUpData.get("email"),
            password_hash: signUpData.get("password")
        }

        console.log(data)

        if (data.name == "" || data.email == "" || data.password == "") {
            errorMsg.innerText = "Missing Input"
            // res.status(400).json({
            //     message: `Missing Input`
            // })
        } else if (data.name.length > 15 || data.email.length > 30 || data.password_hash.length > 15) {
            errorMsg.innerText = "Too Many Characters!"
            // res.status(400).json({

            //     message: `Too many characters!`

            // })
        } else {

            axios
                .post("/users",data)
                .then((response) => {
                    console.log(response)
                    loggedIn()
                    renderLoginPage()
                    rederNav()
                })
            

        }
    })




}

// function loggedIn(){
//     window.localStorage.setItem("logged_in",true)
// }

// function loggedOut(){
//     window.localStorage.setItem("logged_in",false)
// }



