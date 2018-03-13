import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import TelegramBot from 'telegram-bot-api'

export default class bot
{
    constructor()
    {

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
			}));
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
    }
  //  var question = question.find({},{fields: {Id: 1}}).fetch();
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
    		case '/question':
     			this.sendMessage(userId,question);
     		break;  		
       		default:
				this.Err(from);
			break;
		}
	}	

//
} // closing class bot
