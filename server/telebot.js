import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import TelegramBot from 'telegram-bot-api'

export default class bot
{
    constructor()
    {
        this.bot = new TelegramBot //Создание объекта
        ({
            token: '537391366:AAGIefdTJRa1pzO1TxXOGnj9s5SM9eMv_Ts' ,
            updates:
            {
                enabled: true
            }

        });
        const app = this;
		this.bot.on('message', Meteor.bindEnvironment(function(message) //Привязываем телеграм к метеору и получаем входящие сообщения
			{
				app.receiveMessage(message.from.id, message.text, message.from.first_name, message.date) 
				//Here we can receive messages
			}
            ));
    }
   sendMessage(userId, text) // сообщение без кнопок
    {
        this.bot.sendMessage
        ({
            chat_id: userId,
            text: text,
            parse_mode: 'HTML'
        }).catch((err)=>
        {
            console.log(err);

            if (err.statusCode == 403)
            {
                return err;
            }
        });
        Log.update({user_id: userId}, {$set:{last_question: text}});
    }
    sendErrorstart(userId, text) // отправка сообщение без обновления информации
    {
        this.bot.sendMessage
        ({
            chat_id: userId,
            text: text,
            parse_mode: 'HTML'
        }).catch((err)=>
        {
            console.log(err);

            if (err.statusCode == 403)
            {
                return err;
            }
        });
    }
    sendKeyboard(userId, text,array) // сообщение с кнопками
    {
        this.bot.sendMessage
        ({
            chat_id: userId,
            text: text,
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
        keyboard: [ 
            array
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    })
        }).catch((err)=>
        {
            console.log(err);

            if (err.statusCode == 403)
            {
                return err;
            }
        });
        Log.update({user_id: userId}, {$set:{last_question: text}});
    }
    insert(userId, text, from,  date) // если метод find() - false,то вызываем. Добавление нового пользователя
    {    
    	
        Log.insert({ user_id: userId , last_answer: text, user_name: from ,   time: date});  
    }
    update(userId, text, from,  date) // / если метод find() - true,то вызываем. Обновляет уже существующего пользователя
    {

        Log.update({user_id: userId}, {$set:{user_id: userId, last_answer: text, user_name: from ,   time: date}}); 
    }

    find(userId) // метод проверки пользователя в таблице "Log"
    {
      const findUser = Log.findOne({user_id: userId}); // ищем пользователя в базе
      if (typeof findUser == 'undefined')  return false; //var userflag = false;
      else return true; //userflag = true;
    }

  firstq() // проверка на первый вопрос. задан ли он. Если нет - ошибка. Если да - возвращает поле с текстом первого вопроса
    {
      var firstq = Question.findOne({first_question: true});
      if (typeof firstq == 'undefined') 
      {
        console.log("Ошибка! Первый вопрос не задан!");
        let er = "Ошибка!Первый вопрос не задан!"
        return err;
      }
      else 
        { 
          firstq = firstq.bot_msg;
          return firstq;
        }
    }

  Err(userId,text)
    {
    	let textToSend = 'Некорректные данные! \nВведите \ "/start" \ для просмотра доступных функций';
    	this.sendMessage(userId, textToSend);
    }
    errorstart(userId,text)
    {
      let textToSend = 'Некорректные данные! \nВведите \ "/start" \ для начала диалога';
      this.sendErrorstart(userId, textToSend);
    }
     Bot_start(userId,text)
    {
    	var firstq = Question.findOne({first_question: true});
      if (typeof firstq == 'undefined') 
      {
        console.log("Ошибка! Первый вопрос не задан!");
        let er = "Ошибка!Первый вопрос не задан!"
        return er;
      }
      else 
        {
          var qid = firstq.answerId;
        var array = new Array(); // массив answer_var для вывода кнопок
          var msg = Answer.find({_id: {$in:qid}}, {sort: {answer_var: 1}}); //, {answer_var:1} //ПРОБЛЕМА ТУТ  
          msg.forEach((msg) => {
            array.push(msg.answer_var);
          });
      firstq = firstq.bot_msg;
      var a1 = Answer.findOne({_id: {$in:qid} });
      var otv = a1.question.bot_msg;
      var type = a1.answer_type;
      if (type == "select") this.sendKeyboard(userId,firstq,array);
      else 
        {
          this.sendMessage(userId,"Спасибо! Мы с вами свяжемся!")
          Log.update({user_id: userId}, {$set:{note: text}});
        }
        }
    }
    Bot_continue(userId,text)
    {
      var q = Log.findOne({user_id: userId}); //курсор на пользователе
      var a = q.last_answer // последний ответ пользователя
      q = q.last_question;  // последний вопрос пользователю
      var q1 = Question.findOne({bot_msg: q }); 
      if (q1.last_question == false)
      {
      var qid = q1.answerId; //строка id
      var a1 = Answer.findOne({answer_var: a, _id: {$in:qid} }); // курсор на нужном ответе (след проверка на ввод)
      var otv = a1.question.bot_msg;
      var nextq = Question.findOne({bot_msg: otv});
      qid = nextq.answerId;
      var array = new Array(); // массив answer_var для вывода кнопок
          var msg = Answer.find({_id: {$in:qid}, }, {sort: {answer_var: 1}}); //, {answer_var:1} //ПРОБЛЕМА ТУТ  
          msg.forEach((msg) => {
            array.push(msg.answer_var);
          });
      var type = a1.answer_type;
      if (type == "select") this.sendKeyboard(userId,otv,array);
      else 
        {
          this.sendMessage(userId,"Спасибо! Мы с вами свяжемся!")
          Log.update({user_id: userId}, {$set:{note: text}});
        }
      }
      else this.sendMessage(userId,"Спасибо! Мы с вами свяжемся!") // универсальный ответ, если последний вопрос является последним в таблице
    }
  receiveMessage(from, text, username, date)
	{
			text = text.toLowerCase();
    if (text == '/start')
    {
      var userflag = this.find(from); //проверка. есть ли пользователь в базе
      if (userflag == false) // если нет, то создаем новую запись
        {
          this.insert(from, text, username,  date);
          this.Bot_start(from); // вызываем метод firsq !!!!!!!!!
          console.log("false. Новый пользователь добавлен.");  
        }
      else
        {
          this.update(from, text, username,  date);
          this.Bot_start(from);
          console.log("true. Данные пользователя перезаписаны.");
        }
    } //конец большого if
      else // если юзер ввел другой текст(не /start )
      {
        var userflag = this.find(from); //проверка. есть ли пользователь в базе
        if (userflag == false) // если нет, то создаем новую запись
        {
          this.insert(from, text, username,  date);
          this.errorstart(from); // вызываем метод firsq !!!!!!!!!
          console.log("false. Новый пользователь добавлен.");  
        }
        else // именно тут мы продолжаем диалог с уже существующим пользователем после /start
        {
          this.update(from, text, username,  date);
          this.Bot_continue(from);
          console.log("true. Данные пользователя перезаписаны.");
        }
      } 
	}	
} // closing class bot




/*import { Meteor } from 'meteor/meteor'; 
import bot from './telebot.js'
var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
  const app = new bot(); */
  //server.js