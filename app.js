const express = require("express");
const db = require("./db/db.js");
const bodyParser = require('body-parser')
const axios = require('axios').default;


const app = express();

app.use(express.static("static"));
app.use(bodyParser.json());

const PORT = 3000;

app.get("/api/hello", (req,res) => {
   res.json({message: "hello"}) 
})
// get request to trivia API for 10x questions and adds to database
app.get("/api/trivia/random10", (req,res) =>{
axios.get("https://the-trivia-api.com/api/questions?limit=10")
    .then(function(response){
        const APIResponse = response.data
        APIResponse.forEach(element => {
            const {category, difficulty, question, correctAnswer, incorrectAnswers} = element
            const [answer1, answer2, answer3] = incorrectAnswers
            console.log(answer1)
            const sql =`
            INSERT INTO questions(category, difficulty, question, answer1, answer2, answer3, correct_answer)
            VALUES($1,$2,$3,$4,$5,$6,$7)`
            db.query(sql,[category, difficulty, question, answer1, answer2, answer3, correctAnswer]).then(()=>{
                console.log('questions added to database')
            })
        })
    })
    
})

app.get("/api/trivia", (req, res)=> {
    const sql = 'SELECT * FROM quizes';
    db.query(sql).then((result)=> {
        res.json(result.rows);
    })
} )

app.get("/api/trivia/:id", (req, res)=> {
    const {id} = req.params;
    const sql  = 'SELECT questions.id, quizes.name, questions.question, questions.answer1, questions.answer2, questions.answer3, questions.answer4, correct_answer, questions.quiz_id FROM quizes INNER JOIN questions ON quizes.id = questions.quiz_id WHERE quizes.id = $1';
    db.query(sql, [id]).then((result)=>{
        res.json(result.rows);
    })
})

app.post("/api/trivia_answer", (req, res)=> {
    // console.log(req.body);
    const {quiz_id, question_id, user_id, answer, score} = req.body;
    const values = [user_id, quiz_id, question_id, answer, score];
    // console.log(values);
    const sql = 'INSERT INTO answers (user_id, quiz_id, question_id, answer, score) VALUES ($1, $2, $3, $4, $5)';
    db.query(sql, values).then(()=> res.json({"status": "kinda-ok"}))
})

app.listen(PORT, function () {
    console.log("Listening at http://localhost:3000");
});




// notes
// let page = 'HOME'

// function setPage(newPage) {
//     page = newPage
//     renderPage(page)
// }

// function renderHome() {
//     const inner = 
// }

// const renderers = {
//     'HOME': renderHome,
//     'QUIZ': renderQuis
// }

// function renderQuis(id) {
//     if (id && id !== undefined) {
//         html = "<gh1> some_html </gh1>"
//         return html
//     }
//     return defaultHTML
// }

// function renderPage(page){
//     renderFunction = renderers[page]
//     newHTML = renderFunction()
//     const el = document.getElementById('pageContent')
//     el.replaceChildren(newHTML)
// }