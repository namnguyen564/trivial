
import { handleNext } from "./handleNext.js";

// global state to track which question is being answered
// corresponds to an index
let currentQuestionId = 0;
let renderedQuizes = []

function handleChange(e){
    // e.preventDefault();
    e.stopPropagation();
    return true;
  }
export function renderQuiz(id) {
    if (renderedQuizes.find(it => it === id)) {
        console.log(`already rendered quiz: ${id}`)
        return
    }
    renderedQuizes.push(id)
    event.stopPropagation();
    // console.log("rendering quiz id", id)
    const quiz = document.getElementById(`quiz-${id}`);
    axios.get(`http://localhost:3000/api/trivia/${id}`)
        .then((response)=>{
            const questions = response.data;
            console.log(questions);
            const questionContainer = document.createElement('div')
            quiz.appendChild(questionContainer);
            questionContainer.id = 'question-container';
            for (let [index, question] of questions.entries()) {
                const questionForm = document.createElement('form');
                questionForm.className = 'question';
                if (index == 0) {
                    questionForm.classList.remove('question');
                }
                questionForm.id = `question-form-${index}`;
                questionForm.setAttribute("method", "POST");
                questionForm.innerHTML = `
                <p>${question.question}</p>
                <input type="radio" id="answer1" name="answer" value="${question.answer1}" onchange="(event)=> event.preventPropagation();">
                <label for="answer1">${question.answer1}</label><br>
                <input type="radio" id="answer2" name="answer" value="${question.answer2}" onchange="handleChange(event)">
                <label for="answer2">${question.answer2}</label><br>  
                <input type="radio" id="answer3" name="answer" value="${question.answer3}" onchange="handleChange(event)">
                <label for="answer3">${question.answer3}</label><br>
                <input type="radio" id="answer4" name="answer" value="${question.answer4}" onchange="handleChange(event)">
                <label for="answer3">${question.answer4}</label><br><br>
                <button>Next</button>
                `
                questionContainer.appendChild(questionForm);

                // ON SUBMIT HANDLING
                questionForm.addEventListener("submit", function (event) {
                    event.preventDefault();
                    questionForm.classList.add('question');

                    const formData = new FormData(questionForm);
                    const answer = formData.get('answer');
                    const score = answer== question.correct_answer ? 1 : 0;
                    const data = {
                        user_id: 2,
                        quiz_id: question.quiz_id,
                        question_id: question.id,
                        answer: answer,
                        score: score
                    };
                    console.log(data)
                    
                    axios
                        .post("/api/trivia_answer", data)
                        .then((response) => {
                        console.log(response);})
                    if (currentQuestionId == questions.length -1) {
                        console.log(currentQuestionId);
                        //TODO: replace user_id
                        axios.get(`/api/trivia_answer?user_id=2&quiz_id=${question.quiz_id}`)
                             .then((response) => {
                                console.log(response.data.avg);
                                const avgScore = Math.round(response.data.avg * 100);
                                
                                const result = document.createElement('p');
                                result.innerText = `Your score for this quiz is: ${response.data.avg}%!`;
                                questionContainer.replaceChildren(result);
                            })
                    }
                    else {incrementCurrentQuestion()}
                })
            }
        })
}


function incrementCurrentQuestion() {
    console.log('incrementing question')
    // hide current question
    const answered = document.getElementById(`question-form-${currentQuestionId}`)
    answered.classList.add('question')
    // increment currentQuestionId
    currentQuestionId = currentQuestionId + 1
    const pendingAnswer = document.getElementById(`question-form-${currentQuestionId}`)
    pendingAnswer.classList.remove("question")
}