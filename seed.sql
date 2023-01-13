INSERT INTO users (name, email, password) VALUES ('Guest', 'guest@guest.com', '$2b$10$yPAJkmSXt2pUjiVJ5xjzQulRDeLGPtjQtGADkbiiBdunx.YB1Itve');


INSERT INTO quizes (name) VALUES ('Random Trivia Set');

INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Geography', 'medium', 'The country of Monaco is on which continent?', 'Europe', 'South America', 'Oceania', 'Asia', 'Europe', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('History', 'medium', 'What were the first names of US presidents Madison, Monroe, Polk, and Garfield?', 'James', 'Marshall', 'Theodore', 'Thomas', 'James', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('History', 'medium', 'In which year were the 9/11 attacks?', '2001', '1993', '1997', '2005', '2001', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Society & Culture', 'medium', 'In Greek mythology, what did Daedalus construct for Minos?', 'A Labyrinth', 'A Statue', 'A Child', 'A Flying Horse', 'A Labyrinth', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Music', 'medium', 'Which American singer, songwriter, and actress released the studio album ''The Fame Monster''?', 'Lady Gaga', 'Hikaru Utada', 'Drake', 'Madonna', 'Lady Gaga', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Music', 'medium', 'Which band includes ''Debbie Harry''?', 'Blondie', 'The Pussycat Dolls', 'Three 6 Mafia', 'The Velvet Underground', 'Blondie', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Film & TV', 'medium', 'The Matrix was released in which year?', '1999', '1993', '1996', '2002', '1999', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Music', 'medium', 'Which American singer, actress and record producer released the song ''Lift Off''?', 'Beyoncé', 'Madonna', 'Drake', 'Nicki Minaj', 'Beyoncé', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Geography', 'medium', 'Which country''s flag can be described as ''Two equal horizontal bands of blue and yellow.''?', 'Ukraine', 'Ghana', 'Denmark', 'Puerto Rico', 'Ukraine', 1);
  

  INSERT INTO questions (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) 
  VALUES ('Science', 'medium', 'Flamingos are not naturally pink. They get their color from ________.', 'Algae', 'Prawns', 'Dye', 'Sunlight', 'Algae', 1);

INSERT INTO answers (user_id, quiz_id, question_id, answer, score) 
        VALUES (2, 1, 1, 'Europe', 1);
INSERT INTO answers (user_id, quiz_id, question_id, answer, score) 
        VALUES (2, 1, 2, 'James', 1);
INSERT INTO answers (user_id, quiz_id, question_id, answer, score) 
        VALUES (2, 1, 3, '2001', 1);