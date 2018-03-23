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

//sends message to user using telegram bot API
   sendMessage(userId, text)
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
    sendKeyboard(userId, text)
    {
        this.bot.sendMessage
        ({
            chat_id: userId,
            text: text,
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
        keyboard: [
            [{
                text: 'Share my phone number',
                request_contact: true
            }],
            [{
                text: 'Share my phone number',
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
        Log.update({user_id: userId}, {$set:{last_question: text}});
    }

   /*) JSON.stringify({
      keyboard: [
      resize_keyboard: true
      one_time_keyboard true:

      ]
      ) */
 /* SendButtons()
  {
    keyboard = types.ReplyKeyboardMarkup(true,false)
    button = types.keyboardButton(text="123", request_contact=true)
    keyboard.add(button)
    return keyboard;
  } */
    //const que = Messages.findone({}).fetch();
  // var question = question.find({},{fields: {Id:2}}).fetch();
 // const que = Question.find({Id:1}).fetch();
 //const ques = Messages.find();




    que(userId,text) 
    {
        const query = Messageses.findOne({score:100});
        const textToSend = query.name;
        this.sendMessage(userId, textToSend);
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
      console.log(firstq);
      if (typeof firstq == 'undefined') 
      {
        console.log("Ошибка! Первый вопрос не задан!");
        let er = "Ошибка!Первый вопрос не задан!"
        return er;
      }
      else 
        {
          var qid = firstq.answerId;
          var lalka = firstq.answer
          console.log(lalka);
       //   var count = qid.length;
         for (var i = 0; i<qid.length; i++)
       {
          var msg = Answer.findOne({_id: {$in:qid}});
          msg = msg.answer_var;
         var array = new Array();
         for (var j= 0; j<qid.length; j++)
         {
          array.push(msg);
         }
         console.log(array);
          this.bot.sendMessage
        ({
            chat_id: userId,
            text: 'proveka',
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
        keyboard: [ 
            array
           // [{
           //     text: 'msg'
           // }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    })
        })
      }
       // }

          
         // var msg = msg.answer_var;
          console.log(msg);
         // key = 
         firstq = firstq.bot_msg;
      var a1 = Answer.findOne({_id: {$in:qid} });
      var otv = a1.question.bot_msg;

      

      var type = a1.answer_type;
     // console.log(qid);
     // console.log(a1);
    //  if (type == "select") 
     //   {
       //   this.sendKeyboard(userId,firstq, варианты отетов в JSON)
      //  }
        // иначе мы должны записать поле string куда-то
        }
        
    }
    Bot_continue(userId,text)
    {
      var q = Log.findOne({user_id: userId}); //курсор на пользователе
      var a = q.last_answer // последний ответ пользователя
      q = q.last_question;  // последний вопрос пользователя

      var q1 = Question.findOne({bot_msg: q }); 
      var qid = q1.answerId; //строка id
      var array = q1.answerId.answer_var
      var a1 = Answer.findOne({answer_var: a, _id: {$in:qid} }); // курсор на нужном ответе (след проверка на ввод)
      var otv = a1.question.bot_msg;

      var type = a1.answer_type;
      if (type == "select")      
      {
         // this.sendKeyboard(userId,firstq, варианты отетов в JSON)
      } 

    var count = qid.length;
      console.log(qid);
      console.log(array);


   // let textToSend = otv;
   //  this.sendMessage(userId, textToSend);
    }
    sendtest(userId)
  {

      

    var yesno = 
      {
        reply_markup: 
        {
          ReplyKeyboardMarkup:
          {
            "resize_keyboard": true,
            "one_time_keyboard": true,
            "keyboard": [["Yes"],["no"]]
          }
        }
      }
      let text = 123;
     // this.sendKeyboard(userId, text, yesno);
  }

	receiveMessage(from, text, username, date)
	{

			text = text.toLowerCase();
      //this.sendKeyboard(from,text);
     this.Bot_start(from,text);
     // var danet = 
       //var keyboard = this.SendButtons();
//this.sendKeyboard(from,text);
     //  if (text = 1) this.sendtest();
       
		//	this.sendMessage(from,banana);
  /*  if (text == '/start')
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
      } */
    //  проверяется последний вопрос в таблице log в поле last_question и присваеваем это значение переменной q. findone - курсор, далее поле last_question
    //  проверяется последний вопрос в таблице log в поле last_answer и присваеваем это значение переменной a. findone - курсор, далее поле last_answer
    // возможно!! если 1 ответ == /start, то мы делаем что-то
//var q = Log.findOne({user_id: userId}); //курсор на пользователе
//var a = q.last_answer // последний ответ пользователя
//q = q.last_question;  // последний вопрос пользователя
// var q1 = Question.findOne({user_id: q}); //курсор последний вопрос
// var a1 = q1.answer;
//console.log(a1);
// если последний вопрос, то "диалог закончен" или что-то типо того

// думаю последний вопрос не нужен. просто оставить без вариантов ответов.
    //если  


   /*   switch(text)
      {
      	case: '/start':
      	this.firstq()
      	this.sendMessage(from, question);
      	break;
      	default:
      	break;
      } */







 // если пользователь уже есть в базе, то мы ищем его последний ответ(меняем поле (findone по ответу и присваеваем переменной ). этот ответ
//var q = Question.findOne({}) - последний вопрос бота



 // var otvet = Log.findOne({chat_id: userId});     это все равно text
 // otvet = otvet.last_answer;
 //добавить ошибку
   // console.log(userflag);
		
  	/*	switch(text) 
  		{
   			case '/start':
     			this.Bot_start(from);
         
    		break;
    		//case '/question':
     		//	this.sendMessage(userId,,username);
     		//break; 
            case '/question':
             this.que(from);
            break;
            case '/find':
             this.find(from);
            break;
            case '/insert':
             this.insert(from,text, username, date);
            break;  		
       		default:
        //  this.insert(from,text, username, date)
				this.Err(from);
			break;
		  } */
	}	


} // closing class bot




/*import { Meteor } from 'meteor/meteor';
import bot from './telebot.js'
var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
  //bot.fillDb();
  const app = new bot(); */