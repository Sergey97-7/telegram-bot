// Question
Question.join(Answer, "answerId", "answer", ["answer_var", "answer_type", "questionId", "question"]);

// Answer
Answer.join(Question, "questionId", "question", ["Id", "bot_msg", "answer_type", "answer_var"]);

