const amqp = require('amqplib');

const init = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'dicoding';
    const message = 'Selamat belajar message broker!';

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log('Pesan berhasil dikirim');

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 1000);
};

init();