

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
            password: signUpData.get("password")
        }

        console.log(data)

        if (data.name == "" || data.email == "" || data.password == "") {
            errorMsg.innerText = "Missing Input"
            res.status(400).json({
                message: `Missing Input`
            })
        } else if (data.name.length > 12 || data.email.length > 12 || data.password.length > 12) {
            errorMsg.innerText = "Too Many Characters!"
            res.status(400).json({

                message: `Too many characters!`

            })
        } else {

            axios
                .post("/users", data)
                .then((response) => {
                    console.log("congrats")
                })

        }
    })




}