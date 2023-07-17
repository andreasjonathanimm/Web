const amqlib = require('amqplib');

const init = async () => {
    const connection = await amqlib.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'dicoding';

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.consume(queue, message => {
        console.log(`Menerima pesan ${message.content.toString()}`);
    }, { noAck: true });
};

init();