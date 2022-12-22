export function renderSignUpPage(){
    const header = document.getElementById("header-nav");
    
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

    signUpForm.addEventListener("submit", function(event){
        event.preventDefault();

        const signUpData = new FormData(signUpForm)

        const data = {
            name: signUpData.get("name"),
            email: signUpData.get("email"),
            password: signUpData.get("password")
        }
        
        console.log(data)



    })


    

}