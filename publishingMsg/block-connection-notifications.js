const amqp = require('amqplib');

async function startConsumer() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        channel.on('blocked', (reason) => {
            console.log('Connection blocked:', reason);
        });

        channel.on('unblocked', () => {
            console.log('Connection unblocked');
        });

        channel.prefetch(1);
        await channel.assertQueue('my_queue');

        channel.consume('my_queue', (msg) => {
            const message = msg.content.toString();
            console.log('Received message:', message);
            channel.ack(msg);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
startConsumer();