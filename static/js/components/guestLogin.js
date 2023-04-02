import{rederNav} from './renderNavBar.js'
import{loggedIn} from './userStatus.js'
import { renderLoginPage } from "./renderLoginPage.js";


export function guestLogin(){
    axios
    .get("/users/guestLogin")
    .then((response) =>{
        console.log(response)
        loggedIn()
        renderLoginPage()
    })
}
