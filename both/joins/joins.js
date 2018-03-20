// Question
Question.join(Answer, "answerId", "answer", ["answer_type", "answer_var", "questionId", "question"]);

// Answer
Answer.join(Question, "questionId", "question", ["bot_msg"]);

