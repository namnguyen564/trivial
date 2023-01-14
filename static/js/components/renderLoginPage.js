import { renderSignUpPage } from './renderSignUpPage.js'
import { verifyLogin } from './verifyLogin.js'
import { loggedOut } from './userStatus.js'
import { guestLogin } from './guestLogin.js'
import{rederNav} from './renderNavBar.js'
import{loggedIn} from './userStatus.js'


export function renderLoginPage() {
    const header = document.getElementById("header-nav");
    const middle = document.getElementById("middle-nav");
    const errorMsg = document.getElementById("error-msg");

    if(isLoggedIn){
        header.innerHTML = `
        <h1 id='title'>TRIVIAL</h1>
        <p1 id="description">SUPER FUN TRIVIA GAME!</p1>
        <input type="submit" value="Log Out" id="logOutButton">
        `   
        

        middle.innerHTML =''
       
        errorMsg.innerHTML =  ''

        // loggedIn()
        rederNav()
        
        document.getElementById('logOutButton').addEventListener('click', loggedOut)

        
    }



    if (!isLoggedIn()){
        header.innerHTML = `
       <h1 id='title'>TRIVIAL</h1>
       <p1 id="description">SUPER FUN TRIVIA GAME!</p1>
        `
        middle.innerHTML = `
        <div id="loginContainer">
     
        <form id="login-form">
        <input type="text" name="email" id="email-field" class="login-form-field" placeholder="Email">
        <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
        <input type="submit" value="Login" id="login-form-submit">
        </form>
        <input type="submit" value="Sign Up" id="signUpButton">
        <input type="submit" id="guestLoginButton" value="Guest Login" >
        </div>
        `
        
    document.getElementById('signUpButton').addEventListener('click', renderSignUpPage)
    document.getElementById('login-form-submit').addEventListener('click', verifyLogin)
    document.getElementById('guestLoginButton').addEventListener('click', guestLogin)
    

    }
}

function isLoggedIn(){
    return window.sessionStorage.getItem("logged_in") === "true"
}

