import{renderSignUpPage} from './renderSignUpPage.js'
import {fireEvent} from '@testing-library/dom'
import MockAdapter from "axios-mock-adapter"

const mockAxios = new MockAdapter(global.axios)

beforeEach(function(){
    mockAxios.onPost("/users").reply(200, {status: "ok"})
    const header = document.createElement("div")
    header.setAttribute("id", "header-nav")
    document.body.appendChild(header)

    renderSignUpPage()
})

test("sign up page rendered ", () => {
   
    const name = document.getElementById("name")
    expect(name).not.toEqual(null)
    

})

test("form submission", () => {
    const name = document.getElementById("name")
    const submitButton = document.getElementById("sign-up-form-submit")
    // Type in name
    fireEvent.change(name, {target:{value: "John Doe"}})
    
    // Submit Form
    fireEvent.click(submitButton)
    // Turn the body that backend would receive to JSON
    const providedData = JSON.parse(mockAxios.history.post[0].data)
   
    expect(providedData.name).toEqual("John Doe")

    
    
})