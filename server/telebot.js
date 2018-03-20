import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import TelegramBot from 'telegram-bot-api'
//const Messageses = new Mongo.Collection('messageses');


export default class bot
{
    constructor()
    {


//const que = Messages.find({text: 'Hello, world!' });



        
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
				app.receiveMessage(message.from.id, message.text, message.from.first_name, message.date) //datetime.datetime.now
				//app.insert(message.from.id, message.text, message.from.first_name)
				//Here we can receive messages
			}
            ));
    }

  /*  static fillDb()
    {
        Messageses.insert({ name: "David", score: 250 });
        Messageses.insert({ name: "Leroy", score: 500 });
        Messageses.insert({ name: "Anna", score: 100 });
       Messages.insert({ text: 'Hello, world!' }, {name:'jane'});
       Messages.insert({ text: 1 });
        
   } */

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
    sendErrorstart(userId, text)
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

    //const que = Messages.findone({}).fetch();
  // var question = question.find({},{fields: {Id:2}}).fetch();
 // const que = Question.find({Id:1}).fetch();
 //const ques = Messages.find();


/*que(userId,text) Правильный вариант
    {
        const query = Messageses.findOne({score:100});
        const textToSend = query.name;
        this.sendMessage(userId, textToSend);
    }*/ 

 //Question.findOne({Id:1});
    que(userId,text) 
    {
        const query = Messageses.findOne({score:100});
        const textToSend = query.name;
        this.sendMessage(userId, textToSend);
    }
    insert(userId, text, from,  date) // если метод find() - false,то вызываем. Добавление нового пользователя
    {    
    	//var count = 1;
        Log.insert({ user_id: userId , last_answer: text, user_name: from ,   time: date}); 
       // let textToSend = "данные записаны!";
       // this.sendMessage(userId, textToSend);
    }
    update(userId, text, from,  date) // / если метод find() - true,то вызываем. Обновляет уже существующего пользователя
    {

        Log.update({user_id: userId}, {$set:{user_id: userId, last_answer: text, user_name: from ,   time: date}}); 
    }
  /*  find(userId)
    {
        const findUser = Log.find({chat_id:user_id});
        const findUserChatId = findUser.user_id;
        let textToSend = userId;
        this.sendMessage(userId, textToSend);
    } */


   // если пользователь есть в базе, то мы ищем его последний ответ и задаем следующий вопрос. если нет в базе - мы создаем новую запись.
   // если такой user_id существует, то мы возвращаем флаг true, иначе флаг false
   // если find = true, то
   // const findUser = Log.find({chat_id:user_id});

    find(userId) // метод проверки пользователя в таблице "Log"
    {
      const findUser = Log.findOne({user_id: userId});
      if (typeof findUser == 'undefined')  return false; //var userflag = false;
      else return true; //userflag = true;
    }

   // insert(userId,text)
  //  {
  //      Messageses.insert({ name: "David" });
   //    
   //     this.sendMessage(userId, textToSend);
  //  }


  firstq() // проверка на первый вопрос. задан ли он. Если нет - ошибка. Если да - возвращает поле с текстом первого вопроса
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
    	
      let textToSend = this.firstq();
    	//let textToSend = firstq();
    	//let textToSend = 'Начальный вопрос? \n 1 - Один \n 2 - Два \n 3 - Три  ';
    	this.sendMessage(userId, textToSend);
    }
    Bot_continue(userId,text)
    {
      
      var q = Log.findOne({user_id: userId}); //курсор на пользователе
      var a = q.last_answer // последний ответ пользователя
      q = q.last_question;  // последний вопрос пользователя

      var q1 = Question.findOne({bot_msg: q}); //курсор последний вопрос в таблице вопросов
      //var a1 = q1.answer.fetch(answer_var);
     var a1 = q1.answer.answer_var; // поле в таблице вопросов. в нем содержится ссылка  на поле вариант ответа. a1 - варианты ответа на данный вопрос

    // var a2 = Answer.findOne({answer_var: a1, "answer_var": a}); // курсор на строчку в таблице ответов по ответу
     var a2 = Answer.findOne({answer_var: a1});
   //  var a3 = a2.answer_type;
    // var a3 = 
    //  var a3 = a2.question; //задается следующий вопрос
    // let textToSend = a3; 

     //this.sendMessage(userId, textToSend);
    // console.log(q1);
     //console.log(a1);
     console.log(a);
    console.log(a2);
    //console.log(a3);

      //let textToSend = this.firstq();
      //let textToSend = firstq();
      //let textToSend = 'Начальный вопрос? \n 1 - Один \n 2 - Два \n 3 - Три  ';
     // this.sendMessage(userId, textToSend);
    }
	receiveMessage(from, text, username, date)
	{

		//	text = text.toLowerCase(); //optional

		//	this.sendMessage(from,banana);
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