const amqp = require('amqplib');

async function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

async function startRPCServer() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        const queue = 'rpc_queue';
        await channel.assertQueue(queue, { durable: false });
        channel.prefetch(1);
        console.log('Awaiting RPC requests...');

        channel.consume(queue, async (message) => {
            const num = parseInt(message.content.toString());

            console.log(`Received RPC request for Fibonacci(${num})`);

            const result = await fibonacci(num);

            channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(result.toString()),
                { correlationId: message.properties.correlationId }
            );

            channel.ack(message);
            console.log(`Sent Fibonacci(${num}) result: ${result}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendRPCRequest(num) {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        const queue = 'rpc_queue';
        const correlationId = Math.random().toString();
        const replyQueue = await channel.assertQueue('', { exclusive: true });

        channel.consume(replyQueue.queue, (message) => {
            if (message.properties.correlationId === correlationId) {
                console.log(`Received Fibonacci(${num}) result: ${message.content.toString()}`);
                channel.close();
                connection.close();
            }
        }, { noAck: true });

        console.log(`Sending RPC request for Fibonacci(${num})`);

        channel.sendToQueue('rpc_queue', Buffer.from(num.toString()), {
            correlationId: correlationId,
            replyTo: replyQueue.queue
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
const num = 10;

startRPCServer();
sendRPCRequest(num);