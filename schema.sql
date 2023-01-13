DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT
);

DROP TABLE IF EXISTS quizes CASCADE;
CREATE TABLE quizes (
  id SERIAL PRIMARY KEY,
  name TEXT
);

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category TEXT,
  difficulty TEXT, 
  question TEXT,
  answer1 TEXT,
  answer2 TEXT,
  answer3 TEXT,
  answer4 TEXT,
  correct_answer TEXT,
  quiz_id INTEGER, 

    FOREIGN KEY (quiz_id)
      REFERENCES quizes(id)
);


DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    question_id INTEGER,
    quiz_id INTEGER,
    answer TEXT,
    score INTEGER,

    FOREIGN KEY (user_id)
      REFERENCES users(id),

    FOREIGN KEY (quiz_id)
      REFERENCES quizes(id),
    
    FOREIGN KEY (question_id)
      REFERENCES questions(id)
);