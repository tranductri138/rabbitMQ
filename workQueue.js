const amqp = require("amqplib")


const URL = 'amqp://localhost:5672'

const connect = async () => {
    const connection = await amqp.connect(URL)
    const channel = await connection.createChannel()
    return channel
}
const workQueue = (channel) => {
    const queue = 'task_queue';
    const msg = process.argv.slice(2).join(' ') || "Hello World!";

    channel.assertQueue(queue, {
        durable: true
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
    });
    console.log(" [x] Sent '%s'", msg);
}

const consumeWQ = (channel) => {
    const queue = 'task_queue';

    channel.assertQueue(queue, {
        durable: true
    });

    channel.consume(queue, function (msg) {
        const secs = msg.content.toString().split('.').length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
            console.log(" [x] Done");
        }, secs * 1000);
    }, {
        noAck: true
    });
}

setTimeout(async () => {
    const channel = await connect()

    // workQueue(channel)
    consumeWQ(channel)
})