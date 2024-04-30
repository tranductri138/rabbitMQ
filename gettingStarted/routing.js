const amqp = require('amqplib');

async function sendMessage(exchangeName, routingKey, message) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, 'direct', { durable: false });
        channel.publish(exchangeName, routingKey, Buffer.from(message));

        console.log(`Message sent with routing key "${routingKey}": ${message}`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function receiveMessage(exchangeName, queueName, bindingKey) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, 'direct', { durable: false });
        const { queue } = await channel.assertQueue(queueName, { exclusive: true });
        channel.bindQueue(queue.queue, exchangeName, bindingKey);

        console.log(`Waiting for messages with binding key "${bindingKey}"...`);

        channel.consume(queue.queue, (message) => {
            console.log(`Received message with binding key "${bindingKey}": ${message.content.toString()}`);
        }, { noAck: true });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
const exchangeName = 'direct_logs';
const routingKey = 'error';
const message = 'An error occurred!';
const queueName = ''; // Empty queue name creates a random queue

sendMessage(exchangeName, routingKey, message);
receiveMessage(exchangeName, queueName, routingKey);