/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
var amqp = require('amqplib/callback_api');//this package give response in promise

amqp.connect(`amqp://localhost`,(err, connection)=>{
    if(err){
        throw err;
    }
    connection.createChannel((err,channel)=>{
        if(err){
            throw err;
        }
        let queueName = 'testingRabbitMQ';
        let message = 'this is Ashu Chauhan';
       channel.assertQueue(queueName,{
        durable: false
       });
       channel.sendToQueue(queueName,Buffer.from(message));
       console.log(queueName);
       console.log(message);
       setTimeout(()=>{
        connection.close();
       }, 1000)
    });
});