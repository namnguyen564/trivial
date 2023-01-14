// global state to track which question is being answered
// corresponds to an index
let currentQuestionId = 0;
// let renderedQuizes = []

function handleChange(e) {
  // e.preventDefault();
  e.stopPropagation();
  return true;
}
export function renderQuiz(id) {
  // if (renderedQuizes.find(it => it === id)) {
  //     console.log(`already rendered quiz: ${id}`)
  //     return
  // }
  // renderedQuizes.push(id)
  event.stopPropagation();
  // console.log("rendering quiz id", id)
  // const quiz = document.getElementById(`quiz-${id}`);
  const page = document.getElementById("page");

  //  <div id="myModal" class="modal">

  //   <div class="modal-content">
  //     <div class="modal-header">
  //       <span class="close">&times;</span>
  //       <h2>Modal Header</h2>
  //     </div>
  //     <div class="modal-body">
  //       <p>Some text in the Modal Body</p>
  //       <p>Some other text...</p>
  //     </div>
  //
  //   </div>

  // </div>
  axios.get(`http://localhost:3000/api/quiz/${id}`).then((response) => {
    const questions = response.data;
    console.log(questions);
    const questionContainer = document.createElement("div");
    page.appendChild(questionContainer);
    questionContainer.id = "question-container";
    questionContainer.className = "modal";
    for (let [index, question] of questions.entries()) {
      const questionContent = document.createElement("div");
      // questionContent.classList = 'modal-content';
      questionContent.classList.add("modal-content", "question");
      if (index == 0) {
        questionContent.classList.remove("question");
      }
      questionContent.id = `question-${index}`;
      questionContent.innerHTML = `
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>${question.question}</h2>
                    </div>
                    <div class="modal-body">
                        <form id="question-form-${index}" method="POST">
                        <input type="radio" id="answer1" name="answer" value="${question.answer1}" onchange="(event)=> event.preventPropagation();">
                        <label for="answer1">${question.answer1}</label><br>
                        <input type="radio" id="answer2" name="answer" value="${question.answer2}" onchange="(event)=> event.preventPropagation();">
                        <label for="answer2">${question.answer2}</label><br>  
                        <input type="radio" id="answer3" name="answer" value="${question.answer3}" onchange="(event)=> event.preventPropagation();">
                        <label for="answer3">${question.answer3}</label><br>
                        <input type="radio" id="answer4" name="answer" value="${question.answer4}" onchange="(event)=> event.preventPropagation();">
                        <label for="answer3">${question.answer4}</label><br><br>
                        <button>Next</button>
                        </form>

                    </div>
                `;
      // const questionForm = document.createElement('form');
      // questionForm.classList.add = 'question';
      // if (index == 0) {
      //     questionForm.classList.remove('question');
      // }
      // questionForm.id = `question-form-${index}`;
      // questionForm.setAttribute("method", "POST");
      // questionForm.innerHTML = `
      // <p>${question.question}</p>
      // <input type="radio" id="answer1" name="answer" value="${question.answer1}" onchange="(event)=> event.preventPropagation();">
      // <label for="answer1">${question.answer1}</label><br>
      // <input type="radio" id="answer2" name="answer" value="${question.answer2}" onchange="handleChange(event)">
      // <label for="answer2">${question.answer2}</label><br>
      // <input type="radio" id="answer3" name="answer" value="${question.answer3}" onchange="handleChange(event)">
      // <label for="answer3">${question.answer3}</label><br>
      // <input type="radio" id="answer4" name="answer" value="${question.answer4}" onchange="handleChange(event)">
      // <label for="answer3">${question.answer4}</label><br><br>
      // <button>Next</button>
      // `
      questionContainer.appendChild(questionContent);
      questionContainer.style.display = "block";

      // HANDLING CLOSING MODAL
      const span = document.getElementsByClassName("close")[index];
      span.addEventListener("click", function () {
        console.log("XXX Clicked");
        questionContainer.style.display = "none";
      });

      // ON SUBMIT HANDLING
      const questionForm = document.getElementById(`question-form-${index}`);
      questionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        questionContent.classList.add("question");

        const formData = new FormData(questionForm);
        const answer = formData.get("answer");
        const score = answer == question.correct_answer ? 1 : 0;
        const data = {
          // TODO:get user_id from session

          quiz_id: question.quiz_id,
          question_id: question.id,
          answer: answer,
          score: score,
        };
        console.log(data);

        axios.post("/api/trivia_answer", data).then((response) => {
          console.log(response);
        });
        if (currentQuestionId == questions.length - 1) {
          console.log(currentQuestionId);
          //TODO: replace user_id
          axios
            .get(`/api/trivia_answer?quiz_id=${question.quiz_id}`)
            .then((response) => {
              console.log(response.data);
              const avgScore = Math.round(response.data.avg * 100);

              // const result = document.createElement('h2');
              // result.innerText = `Your score for this quiz is: ${avgScore}%!`;
              // questionContainer.replaceChildren(result);
              questionContent.innerHTML = `<div class="modal-header">
                                    <span id="finish-quiz-close-btn" class="close">&times;</span>
                                    <h2>${response.data.name}</h2>
                                </div>
                                <div class="modal-body">
                                    <h1>Your score is: ${avgScore}%</h1>
                                </div>
                                `;
              questionContent.classList.remove("question");
              document
                .getElementById("finish-quiz-close-btn")
                .addEventListener("click", () => {
                  console.log("YYYXXX Clicked");
                  questionContainer.style.display = "none";
                });
            });
        } else {
          incrementCurrentQuestion();
        }
      });
    }
  });
}

function incrementCurrentQuestion() {
  console.log("incrementing question");
  // hide current question
  const answered = document.getElementById(`question-${currentQuestionId}`);
  answered.classList.add("question");
  // increment currentQuestionId
  currentQuestionId = currentQuestionId + 1;
  const pendingAnswer = document.getElementById(
    `question-${currentQuestionId}`
  );
  pendingAnswer.classList.remove("question");
}
