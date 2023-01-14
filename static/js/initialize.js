import{renderLoginPage} from './components/renderLoginPage.js'
import{rederNav} from './components/renderNavBar.js'
import { renderNewQuizForm } from './components/createQuiz.js'
// window.addEventListener('beforeunload', (event) => {
//     // Cancel the event as stated by the standard.
//     event.preventDefault();
//     // Chrome requires returnValue to be set.
//     event.returnValue = '';
//   });
console.log("firing!!!")
// createQuiz()
renderLoginPage()
// rederNav()

// if(Window.closed){
//     alert("TRUE")
// }