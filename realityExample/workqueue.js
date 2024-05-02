const amqp = require('amqplib');

const url = 'amqp://localhost:5672'

// Thiết lập kết nối đến RabbitMQ server
const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        // Tạo một queue để lưu trữ công việc
        const queue = 'work_queue';
        await channel.assertQueue(queue, { durable: true });

        // Định nghĩa worker function để xử lý công việc
        await channel.consume(queue, (message) => {
            const task = JSON.parse(message.content.toString());
            processTask(task);
            channel.ack(message);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Đưa công việc vào Work Queue
const addTaskToQueue = async (task) => {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        // Tạo một queue để lưu trữ công việc
        const queue = 'work_queue';
        await channel.assertQueue(queue, { durable: true });

        // Gửi công việc vào queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), { persistent: true });

        // Đóng kết nối
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Hàm xử lý công việc
const processTask = (task) => {
    // Xử lý công việc ở đây
    console.log('Processing task:', task);
};

setTimeout(async () => {
    // Kết nối và bắt đầu lắng nghe công việc
    await connectToRabbitMQ();

    // Thêm công việc vào Work Queue
    await addTaskToQueue({ taskName: 'Làm bài tập toán', taskDescription: 'Giải các phép tính' });
})