// Question
Question.join(Question, "next_q", "question", []);

// Test
Test.join(Question, "questionId", "question", ["Id", "bot_msg", "answer_type", "answer_var", "first_question"]);

