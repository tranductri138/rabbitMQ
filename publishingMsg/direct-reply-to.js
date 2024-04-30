const amqp = require('amqplib');

async function sendRequest(message) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        const callbackQueue = await channel.assertQueue('', { exclusive: true });
        const correlationId = generateUuid();

        console.log('Sending request:', message);

        channel.consume(callbackQueue.queue, (msg) => {
            if (msg.properties.correlationId === correlationId) {
                console.log('Received response:', msg.content.toString());
                channel.close();
                connection.close();
            }
        }, { noAck: true });

        channel.sendToQueue('rpc_queue', Buffer.from(message), {
            correlationId: correlationId,
            replyTo: callbackQueue.queue
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}

// Example usage:
const message = 'Hello, RabbitMQ!';

sendRequest(message);