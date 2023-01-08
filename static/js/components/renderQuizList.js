import { renderQuiz } from "./renderQuiz.js";

// horrible dirty hack to prevent multiple re-renders of awfulness
let hasRendered = false

export function renderQuizList() {
    // console.log("rendering quiz list")
    if (hasRendered === true) {
        console.log("render quiz disabled")
        return
    }
    hasRendered = true
    const quizList = document.getElementById("quiz-list-button");
    axios.get("http://localhost:3000/api/trivia") 
        .then((response) => {
           const listItems = response.data;
           for (let item of listItems) {
            const quiz = document.createElement('li');
            quiz.id = `quiz-${item.id}`;
            quiz.innerHTML = `
                ${item.name} <button id="start-button">Start Quiz</button>
            `;
            quizList.appendChild(quiz);
            document.getElementById("start-button").addEventListener('click', ()=>renderQuiz(item.id))
           }

           })
        
}