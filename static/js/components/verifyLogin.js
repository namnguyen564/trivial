export function verifyLogin() {
    console.log("kms")
    const loginForm = document.getElementById("login-form")



    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginFormData = new FormData(loginForm)


        const data = {
            email: loginFormData.get("email"),
            password: loginFormData.get("password")
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

                    header.innerHTML = `
                <h1>Signed In Mate</h1>
                `
                    console.log(response)

                })
            // axios
            //     .post("/users", data)
            //     .then((response) =>{
            //         header.innerHTML =  `
            //         <h1>Signed In Mate</h1>
            //         `
            //         console.log(response)
            //     })

        }
    })



}