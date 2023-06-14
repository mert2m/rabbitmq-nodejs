const amqp = require("amqplib");
const data = require("./data.json");
const queueName = process.argv[2] || "jobsQueue";

connect();

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    data.forEach((i) => {
      const message = {
        description: i.id,
      };
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log("Gönderilen Mesaj", i.id);
    });

    /* İntervalimiz
    setInterval(() => {
      const message = {
        description: new Date().getTime(),
      };
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log("Gönderilen Mesaj", message);
    }, 1000);
    */

  } catch (error) {
    console.log("Error", error);
  }
}
