/* eslint-disable prettier/prettier */
var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');

const port = 3002;

amqp.connect('amqp://localhost',(err,connection)=>{
    connection.createChannel((err,channel)=>{
        var queue = 'FirstQueue';
        var message = {type:'2',content:'Hello RabbitMQ'};
         channel.assertQueue(queue,{durable: false});
         channel.sendToQueue(queue,Buffer.from(JSON.stringify(message)));
         // eslint-disable-next-line max-len
         console.log(`The message sent is type:${message.type}, content:${message.content} from ${queue}`);
         });
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    },5000);

});

app.listen(port,()=> console.log(`App listening on port ${port}!!!`));
