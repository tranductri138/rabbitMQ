const amqp = require('amqplib')

const URL = 'amqp://localhost:5672'

const connect = async () => {
    const connection = await amqp.connect(URL)
    const channel = await connection.createChannel()
    return channel
}

const addQueue = (channel) => {
    const queue = 'hello';
    const msg = 'Hello world';

    for (let i = 0; i < 10; i ++) {
        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    }
}



const consumeQueue =  (channel) => {
    const queue = 'hello';
     channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
    }, {
        noAck: true
    });
}


setTimeout(async () => {
    const channel = await connect()
    addQueue(channel)
    // consumeQueue(channel)
})