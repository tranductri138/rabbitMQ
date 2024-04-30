const amqp = require('amqplib');

async function publishMessage(exchangeName, message) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, 'fanout', { durable: false });
        channel.publish(exchangeName, '', Buffer.from(message));

        console.log(`Message published: ${message}`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function subscribeToMessages(exchangeName, queueName) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, 'fanout', { durable: false });
        const { queue } = await channel.assertQueue(queueName, { exclusive: true });
        channel.bindQueue(queue.queue, exchangeName, '');

        console.log('Waiting for messages...');

        channel.consume(queue.queue, (message) => {
            console.log(`Received message: ${message.content.toString()}`);
        }, { noAck: true });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
const exchangeName = 'logs';
const message = 'Hello, world!';
const queueName = ''; // Empty queue name creates a random queue

setTimeout(() => {
    publishMessage(exchangeName, message);
    subscribeToMessages(exchangeName, queueName);
})