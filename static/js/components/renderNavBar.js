import { renderQuizList } from "./renderQuizList.js";

export function rederNav() {
    const navBar = document.createElement('ul');
    navBar.id = 'navList';
    navBar.innerHTML = `
    <li id="quiz-list-button">Quizes</li>
    <li id="leaderboard-button">Leader Board</li>
    `;
    document.getElementById('page').replaceChildren(navBar);
    document.getElementById("quiz-list-button").addEventListener('click', renderQuizList);
    // document.getElementById("leaderboard_button").addEventListener('click', renderLeaderboard);
}