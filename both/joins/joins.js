// Question
Question.join(Answer, "answerId", "answer", ["answer_var"]);

// Answer
Answer.join(Question, "questionId", "question", ["bot_msg"]);

