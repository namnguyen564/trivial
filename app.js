require("dotenv").config()
const express = require("express");
const db = require("./db/db.js");
const bodyParser = require('body-parser');
const { response } = require("express");
const axios = require('axios').default;
const bcrypt = require('bcrypt')
const expressSession = require("express-session")


const app = express();

app.use(express.static("static"));
app.use(bodyParser.json());


const port = process.env.PORT;
const pgSession = require("connect-pg-simple")(expressSession)

app.use(expressSession({
    store: new pgSession({
        pool: db,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET,

}))



app.get("/api/hello", (req, res) => {
    res.json({ message: "hello" })
})
// get request to trivia API for 10x questions and adds to database
app.get("/api/trivia", (req, res) => {
    const quizName = req.query["Quiz Name"]
    const userCategory = req.query["category"]
    console.log(quizName)
    console.log(userCategory)

    // Checks if user entered random category and adds 10 random questions to the db 
    if (userCategory == "Random") {
        axios.get("https://the-trivia-api.com/api/questions?limit=10")
            .then(function (response) {
                const APIResponse = response.data
                APIResponse.forEach(element => {
                    const { category, difficulty, question, correctAnswer, incorrectAnswers } = element
                    const [answer1, answer2, answer3] = incorrectAnswers

                    const sql = `
            INSERT INTO questions(category, difficulty, question, answer1, answer2, answer3, correct_answer)
            VALUES($1,$2,$3,$4,$5,$6,$7);`

                    db.query(sql, [category, difficulty, question, correctAnswer, answer1, answer2, answer3, correctAnswer]).then(() => {
                    })
                })
            })
    }
    // If user selects category calls API with specific category 
    else if (userCategory !== "Random") {
        axios.get(`https://the-trivia-api.com/api/questions?limit=10&categories=${userCategory}`)
            .then(function (response) {
                const APIResponse = response.data
                APIResponse.forEach(element => {
                    const { category, difficulty, question, correctAnswer, incorrectAnswers } = element
                    const [answer1, answer2, answer3] = incorrectAnswers
                    const sql = `
            INSERT INTO questions(category, difficulty, question, answer1, answer2, answer3, correct_answer)
            VALUES($1,$2,$3,$4,$5,$6,$7)`
                    // const sql = `WITH first_insert AS (
                    //     INSERT INTO quizes(name)
                    //     VALUES ($1)
                    //     RETURNING id as quiz_id) 
                    //     INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id)
                    //     VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10);
                    // )`
                    db.query(sql, [category, difficulty, question, correctAnswer, answer1, answer2, answer3, correctAnswer]).then(() => {
                    })
                })
            })
    }
})

app.get("/api/quiz", (req, res) => {
    // console.log("app trivia endpoint hit")
    const sql = 'SELECT * FROM quizes;'
    db.query(sql).then((result) => {

        res.json(result.rows);
    })
})


app.get("/api/quiz/:id", (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT questions.id, quizes.name, questions.question, questions.answer1, questions.answer2, questions.answer3, questions.answer4, correct_answer, questions.quiz_id FROM quizes INNER JOIN questions ON quizes.id = questions.quiz_id WHERE quizes.id = $1';
    db.query(sql, [id]).then((result) => {
        res.json(result.rows);
    })
})

app.post('/users', (req, res) => {

    let { name, email, password_hash } = req.body

    console.log(req.session.name)
    console.log(name, email, password_hash)
    const generateHash = bcrypt.hashSync(password_hash, bcrypt.genSaltSync(10), null)

    const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);';

    db.query(sql, [name, email, generateHash])
        .then(() =>
            res.json({ "status": "kinda-ok" }));
    })
    
    
    




app.post("/users/login", async (req, res) => {
    let { email, password_hash } = req.body


    const sql = 'SELECT id,name,password,email FROM users WHERE email=$1';
    db.query(sql, [email])
        .then((queryResult) => {
            console.log(queryResult.rows)

            if (queryResult.rows.length == 0) {
                res.status(404).json({
                    message: `No Email Found`
                })

            } else {
                const userRow = queryResult.rows[0]
                // console.log(userRow)
                // console.log(userRow.password)
                bcrypt.compare(password_hash, userRow.password, function (err, result) {
                    if (result) {
                        req.session.userId = userRow.id
                        req.session.userName = userRow.name
                        req.session.userEmail = userRow.email
                        console.log(req.session.userId)
                        console.log("killme")
                        res.status(200).json({
                            message: `Correct Login`
                        })

                    } else {
                        res.status(404).json({
                            message: `No Email Found`
                        })
                    }

                })
                    .catch((err) => {
                        res.status(500).json({
                            message: 'server error'
                        })
                    })
            }
        });
})

app.get("/users/session", (req, res) => {
    let { email, password_hash } = req.body

    const sql = 'SELECT id,name FROM users WHERE email=$1';
    db.query(sql, [email])
        .then((queryResult) => {
            console.log(queryResult.rows)


        });



})







app.post("/api/trivia_answer", (req, res) => {
    // console.log(req.body);
    const { quiz_id, question_id, user_id, answer, score } = req.body;
    const values = [user_id, quiz_id, question_id, answer, score];
    // console.log(values);
    const sql = 'INSERT INTO answers (user_id, quiz_id, question_id, answer, score) VALUES ($1, $2, $3, $4, $5)';
    db.query(sql, values).then(() => res.json({ "status": "kinda-ok" }))

})

//getting scores from the quiz
app.get("/api/trivia_answer", (req, res) => {
    // console.log(req.query)
    // console.log(req.params)
    const { user_id, quiz_id } = req.query;
    // const sql = 'SELECT AVG(score) FROM answers WHERE user_id=$1 AND quiz_id=$2 GROUP BY quiz_id;'
    const sql = 'SELECT AVG(answers.score), quizes.name FROM answers INNER JOIN quizes ON answers.quiz_id = quizes.id WHERE answers.user_id=$1 AND answers.quiz_id=$2 GROUP BY quizes.name;'
    db.query(sql, [user_id, quiz_id]).then((response) => {
        // res.json({"status": "pretty-good", "data": response.rows[0]})
        res.json(response.rows[0]);
    })
})

app.get("/api/leaderboard", (req, res) => {
    //     SELECT *
    // FROM Table1 
    // INNER JOIN Table2
    //     ON Condition
    // INNER JOIN Table3
    //     ON Condition;
    const sql = 'SELECT AVG(answers.score), users.name AS user, quizes.name AS quiz FROM answers INNER JOIN quizes ON answers.quiz_id = quizes.id INNER JOIN users ON answers.user_id = users.id GROUP BY users.id,quizes.id;'
    db.query(sql).then((response) => {
        res.json(response.rows);
    })
})


app.listen(port, function () {
    console.log(`Listening at http://localhost:${port}`);
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