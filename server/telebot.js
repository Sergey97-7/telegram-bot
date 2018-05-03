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
        if (typeof message.contact == 'undefined') app.receiveMessage(message.from.id, message.text, message.from.first_name, message.date)
        else app.receiveMessage(message.from.id, message.text, message.from.first_name, message.date, message.contact.phone_number)
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
    sendnolog(userId, text) // отправка сообщение без обновления информации
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
    sendphone(userId, text) // запрос номера телефона
    {
        this.bot.sendMessage
        ({
            chat_id: userId,
            text: "Нажмите на кнопку, чтобы отправить нам свой номер.",
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
        keyboard: 
        [ 
            [{
              text: "Поделиться номером",
              request_contact: true
            }]
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
    phone(userId)
    {
      let textToSend = 'Спасибо! С вами скоро свяжутся!';
      this.sendnolog(userId, textToSend);
    }

    Err(userId,text)
    {
    	let textToSend = 'Некорректные данные! \nВведите \ "/start" \ для просмотра доступных функций';
    	this.sendnolog(userId, textToSend);
    }
    errorstart(userId,text)
    {
      let textToSend = 'Некорректные данные! \nВведите \ "/start" \ для начала диалога';
      this.sendnolog(userId, textToSend);
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
          var array = new Array(); 
          var msg = Answer.find({_id: {$in:qid}}, {sort: {answer_var: 1}}); 
          if (typeof msg == 'undefined') this.Err(userId);
          else
            {
              msg.forEach((msg) => {
              array.push(msg.answer_var);
              });
              firstq = firstq.bot_msg;
              var a1 = Answer.findOne({_id: {$in:qid} });
              var otv = a1.question.bot_msg;
              var save = a1.save;
              this.sendKeyboard(userId,firstq,array);
              }
            }
        }
    Bot_continue(userId,text)
    {
      var q = Log.findOne({user_id: userId}); //курсор на пользователе
      var a = q.last_answer // последний ответ пользователя
      q = q.last_question;  // последний вопрос пользователю
      var q1 = Question.findOne({bot_msg: q }); 
          var qid = q1.answerId; //строка id
          var a1 = Answer.findOne({answer_var: a, _id: {$in:qid} }); // курсор на нужном ответе (след проверка на ввод)
          if (typeof a1 == 'undefined') this.Err(userId);
          else
          {
            var otv = a1.question.bot_msg;
            var nextq = Question.findOne({bot_msg: otv});
            qid = nextq.answerId;
            var array = new Array(); // массив answer_var для вывода кнопок
            var msg = Answer.find({_id: {$in:qid}, }, {sort: {answer_var: -1}}); //, {answer_var:1} //ПРОБЛЕМА ТУТ  
            msg.forEach((msg) => 
            {
            array.push(msg.answer_var);
            });
            var save = a1.save;
            if (save == true) Log.update({user_id: userId}, {$push: {note: a}})
            this.sendKeyboard(userId,otv,array);
            }
      }
  receiveMessage(from, text, username, date, phone)
	{
		//	text = text.toLowerCase();
   switch(text)
   {
    case '/phone':
    this.sendphone(from,text);   
    break;

    case '/start':
    var userflag = this.find(from); //проверка. есть ли пользователь в базе
    if (userflag == false) // если нет, то создаем новую запись
    {
      this.insert(from, text, username,  date);
      this.Bot_start(from); 
    }
    else
    {
      this.update(from, text, username,  date);
      this.Bot_start(from);
    }
    break;

    default:
    if (typeof text == 'undefined')
    {
      this.phone(from);
      Log.update({user_id: from}, {$set:{phone: phone}});
    } 
    else
    {
      var userflag = this.find(from); //проверка. есть ли пользователь в базе
      if (userflag == false) // если нет, то создаем новую запись
      {
        this.insert(from, text, username,  date);
       this.errorstart(from); 
      }
      else // именно тут мы продолжаем диалог с уже существующим пользователем после /start
      {
       this.update(from, text, username,  date);
       this.Bot_continue(from);
      }
    }
    break;
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

