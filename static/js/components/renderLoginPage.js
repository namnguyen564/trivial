import { renderSignUpPage } from './renderSignUpPage.js'
import { verifyLogin } from './verifyLogin.js'
import { loggedOut } from './userStatus.js'

export function renderLoginPage() {
    const header = document.getElementById("header-nav");

    if(isLoggedIn){
        header.innerHTML = `
        <h1 id='title'>TRIVIAL</h1>
        <input type="submit" value="Log Out" id="logOutButton">
        `
        document.getElementById('logOutButton').addEventListener('click', loggedOut)
    }
    // header.innerHTML = `
    // <h1 id='title' class="text-style-underline>TRIVIAL</h1>
    // <input type="submit" value="Log Out" id="logOutButton">
    // `


    if (!isLoggedIn()){
        header.innerHTML = `
       <h1 id='title'>TRIVIAL</h1>
       
       <form id="login-form">
       <input type="text" name="email" id="email-field" class="login-form-field" placeholder="Email">
       <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
       <input type="submit" value="Login" id="login-form-submit">
       </form>
       <input type="submit" value="Sign Up" id="signUpButton">
       <input type="submit" value="Guest Login" >
      `;


    document.getElementById('signUpButton').addEventListener('click', renderSignUpPage)
    document.getElementById('login-form-submit').addEventListener('click', verifyLogin)
    


    }
    
    // header.innerHTML = `
    //    <h1 id='title'>TRIVIAL</h1>
       
    //    <form id="login-form">
    //    <input type="text" name="email" id="email-field" class="login-form-field" placeholder="Email">
    //    <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
    //    <input type="submit" value="Login" id="login-form-submit">
    //    </form>
    //    <input type="submit" value="Sign Up" id="signUpButton">
    //    <input type="submit" value="Guest Login" >
    //   `;

      
//     document.getElementById('signUpButton').addEventListener('click', renderSignUpPage)
//     document.getElementById('login-form-submit').addEventListener('click', verifyLogin)
}

function isLoggedIn(){
    return window.localStorage.getItem("logged_in") === "true"
}

