import{renderSignUpPage} from './renderSignUpPage.js'

beforeEach(function(){
    const header = document.createElement("div")
    header.setAttribute("id", "header-nav")
    document.body.appendChild(header)

    renderSignUpPage()
})

test("sign up page rendered ", () => {
   
    const name = document.getElementById("name")
    expect(name).not.toEqual(null)
   

})

