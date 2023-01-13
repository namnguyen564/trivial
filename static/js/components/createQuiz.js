import { renderQuizList } from "./renderQuizList.js"

export function renderNewQuizForm() {
    const page = document.getElementById('page')
    page.replaceChildren()

    const quizForm = `
    <form id="CreateQuizForm">
    <label for="Quiz Name">Quiz Name</label>
    <input type="text" name="Quiz Name" id="quizName"><br>
    <label for="category">Pick a category</label>
    <select name="category" id="category">
        <option value="General Knowledge">General Knowledge</option>
        <option value="Society & Culture">Society & Culture</option>
        <option value="History">History</option>
        <option value="Sport & Leisure">Sport & Leisure</option>
        <option value="Geography">Geography</option>
        <option value="Music">Music</option>
        <option value="Film & TV">Film & TV</option>
        <option value="Science">Science</option>
        <option value="Food & Drink">Food & Drink</option>
        <option value="Arts & Literature">Arts & Literature </option>
        <option value="Random">Random</option>
        <input type="submit" value="Submit" id="createQuizSubmit">
            
    </select>

</form>
    
    `

page.innerHTML=quizForm
// addEventListener('submit', renderQuizList)
const form = document.getElementById("CreateQuizForm")
form.addEventListener('submit', function(event){
    event.preventDefault()
    const category = document.getElementById("category").value
    const quizName = document.getElementById("quizName").value
    const data = {category,quizName}
    axios.post("/api/trivia", data).then(function(){
        renderQuizList()
    })
})
}
