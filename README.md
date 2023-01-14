# trivial- A single page trivia application! (SPTA)


Our team approached the development of this application by initially wireboarding in exellidraw the different application states required to create a Minimum Viable Product (MVP). After designing the layout, we used Trello to group the different app states into their frontend/backend features. After adding each feature into Trello, we self-assigned ownership of the features to each person. 

----MPV Features----
- Signup and Login functionality 
- Frontend API call to fetch quiz questions and render each quiz 
- Frontend form to create new quiz and adding quiz questions to db


Installation instructions: After cloning the repo, create a psql database called "trivia", and import the attached schema. 
Run npm install to fetch and installed the correct dependancies. 

Tech stack backend: 
Node.js for backend server operations; 
Express.js for backend API delivery; 
bcrypt for authentication password hashing;
axios for external API calls;
And middleware of express-sessions and pg for database queries;
Database uses postgreSQL

Frontend: 
HTML/CSS/JS
Axios for backend API calls 


dependencies: 
    "axios": "^1.2.1",
    "bcrypt": "^5.1.0",
    "connect-pg-simple": "^8.0.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "pg": "^8.8.0"
    https://the-trivia-api.com/ public API website 