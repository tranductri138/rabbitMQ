const amqp = require('amqplib');

// Thiết lập kết nối đến RabbitMQ server
const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        // Tạo exchange cho Publish/Subscribe
        const exchange = 'logs';
        await channel.assertExchange(exchange, 'fanout', { durable: false });

        // Tạo queue ngẫu nhiên và bind nó với exchange
        const { queue } = await channel.assertQueue('', { exclusive: true });
        await channel.bindQueue(queue, exchange, '');

        // Định nghĩa consumer để tiêu thụ tin nhắn từ queue
        await channel.consume(queue, (message) => {
            const logMessage = message.content.toString();
            console.log('Received log:', logMessage);
        }, { noAck: true });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Gửi log message vào exchange
const publishLogMessage = async (logMessage) => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        // Tạo exchange cho Publish/Subscribe
        const exchange = 'logs';
        await channel.assertExchange(exchange, 'fanout', { durable: false });

        // Gửi log message vào exchange
        channel.publish(exchange, '', Buffer.from(logMessage));

        // Đóng kết nối
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

setTimeout(async () => {
    // Kết nối và bắt đầu lắng nghe log messages
    await connectToRabbitMQ();

    // Gửi một số log messages vào exchange
    await publishLogMessage('Log message 1');
    await publishLogMessage('Log message 2');
})