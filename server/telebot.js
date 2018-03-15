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
				app.receiveMessage(message.from.id, message.text, message.from.first_name)
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
        const query = Question.findOne();
        const textToSend = query.first_question;
        this.sendMessage(userId, textToSend);
    }
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
	receiveMessage(from, text, username)
	{
			text = text.toLowerCase();
		//	this.sendMessage(from,banana);
		
  		switch(text) 
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
       		default:
				this.Err(from);
			break;
		}
	}	

//
} // closing class bot
