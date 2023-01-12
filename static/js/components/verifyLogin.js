export function verifyLogin(){
    console.log("kms")
    const loginForm = document.getElementById("login-form")
    


    loginForm.addEventListener("submit", function(event){
        event.preventDefault();

        const loginFormData = new FormData(loginForm)


        const data = {
            email: loginFormData.get("email"),
            password: loginFormData.get("password")
        }

        console.log(data)

        axios
            .post("/users/login", data)
            .then((response) =>{
                
                // header.innerHTML =  `
                // <h1>Signed In Mate</h1>
                // `
                console.log(response)
                location.reload()

            })
            .catch((err) =>{
                console.log(err)
            })

    })



}