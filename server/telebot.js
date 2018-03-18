import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import TelegramBot from 'telegram-bot-api'
const Messageses = new Mongo.Collection('messageses');


export default class bot
{
    constructor()
    {


//const que = Messages.find({text: 'Hello, world!' });



        //Creates telegram bot object
        this.bot = new TelegramBot
        ({
            token: '537391366:AAGIefdTJRa1pzO1TxXOGnj9s5SM9eMv_Ts' ,
            updates:
            {
                enabled: true
            }

        });

        const app = this;
        //Binding telegram to our meteor environment and start listening incoming messages
		this.bot.on('message', Meteor.bindEnvironment(function(message)
			{
				app.receiveMessage(message.from.id, message.text, message.from.first_name, message.date)
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
        Log.insert({ chat_id: userId , last_answer: text, user_name: from ,   time: date }); 
       // let textToSend = "данные записаны!";
       // this.sendMessage(userId, textToSend);
    }
    update(userId, text, from,  date) // / если метод find() - true,то вызываем. Обновляет уже существующего пользователя
    {
        Log.update({ chat_id: userId , last_answer: text, user_name: from ,   time: date }); 
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
      const findUser = Log.findOne({chat_id: userId});
      if (typeof findUser == 'undefined')  return false; //var userflag = false;
      else return true; //userflag = true;
    }

   // insert(userId,text)
  //  {
  //      Messageses.insert({ name: "David" });
   //    
   //     this.sendMessage(userId, textToSend);
  //  }
  Err(userId,text)
    {
    	let textToSend = 'Некорректные данные! \nВведите \ "/start" \ для просмотра доступных функций';
    	this.sendMessage(userId, textToSend);
    }
     Bot_start(userId,text)
    {
    	let textToSend = 'Добро пожаловать! Что будете кушать? \n 1 - Фрукт \n 2 - Овощ \n 3 - Десерт  ';
    	this.sendMessage(userId, textToSend);
    }
	receiveMessage(from, text, username, date)
	{

			text = text.toLowerCase();
		//	this.sendMessage(from,banana);
     var userflag = this.find(from);
     if (userflag == true)
     {
      this.insert(from, text, username,  date);
        console.log("true. данные ПЕРЕзаписаны.");
        
     }
     else
      {
        this.update(from, text, username,  date);
        console.log("false. данные записаны.");
      }

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
          this.insert(from,text, username, date)
				//this.Err(from);
			break;
		  } */
	}	


} // closing class bot
