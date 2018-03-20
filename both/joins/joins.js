// Question
Question.join(Answer, "answerId", "answer", []);

// Answer
Answer.join(Question, "questionId", "question", ["Id", "bot_msg", "answer_type", "answer_var"]);

