import { renderQuizList } from "./renderQuizList.js";
import { renderNewQuizForm } from "./createQuiz.js";
import { renderLeaderboard } from "./renderLeaderboard.js";

export function rederNav() {
    const navBar = document.createElement('ul');
    navBar.id = 'navList';
    navBar.innerHTML = `
    <li id="new-quiz-button">New Quiz</li>
    <li id="quiz-list-button">Quizes</li>
    <li id="leaderboard-button">Leader Board</li>
    `;

    // document.getElementById('header-nav').replaceChildren(navBar);
    // TODO:if logged in, use replace children instead of append child.
    document.getElementById('header-nav').appendChild(navBar);
    document.getElementById("quiz-list-button").addEventListener('click', renderQuizList);
    document.getElementById("new-quiz-button").addEventListener('click', renderNewQuizForm)
    document.getElementById("leaderboard-button").addEventListener('click', renderLeaderboard);
}