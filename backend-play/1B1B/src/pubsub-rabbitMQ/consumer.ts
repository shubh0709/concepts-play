import amqp from "amqplib";

connect();
async function connect() {

    try {
        const amqpServer = "amqps://udmtuact:JUaoHJzAQKjRojxJknIhDIYbah3ZsX9F@puffin.rmq2.cloudamqp.com/udmtuact"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", (message:any) => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            //"7" == 7 true
            //"7" === 7 false

            if (input.number == 7)
                channel.ack(message);
        })

        console.log("Waiting for messages...")

    }
    catch (ex) {
        console.error(ex)
    }

}