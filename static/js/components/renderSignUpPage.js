import{rederNav} from './renderNavBar.js'
import{loggedIn} from './userStatus.js'
import { renderLoginPage } from "./renderLoginPage.js";

export function renderSignUpPage() {
    const header = document.getElementById("header-nav");
    const errorMsg = document.getElementById("error-msg")
    const middle = document.getElementById("middle-nav");

    errorMsg.innerText = ''

    // header.innerHTML = `
    // <h1>Sign Up Page</h1>

    // `
    middle.innerHTML=''

    const signUpForm = document.createElement("form")
    signUpForm.setAttribute("id", "signUpFormId")
    signUpForm.innerHTML = `
    <div id="loginContainer2">
    <input type="text" id="name" name="name" placeholder="Name" class="login-form-field2">
    <input type="text" id="email" name="email" placeholder="Email" class="login-form-field2">
    <input type="password" id="password" name="password" placeholder="Password" class="login-form-field2">
    <input type="submit" value="Sign Up"  id="signUpButton2">
    <div>
    `

    // signUpForm.setAttribute("method", "POST")
    middle.appendChild(signUpForm)

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



