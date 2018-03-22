// Question
Question.join(Answer, "answerId", "answer", ["answer_var", "question"]);

// Answer
Answer.join(Question, "questionId", "question", ["bot_msg"]);

