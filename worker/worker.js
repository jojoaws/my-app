const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ region: process.env.AWS_REGION });
const QUEUE_URL = process.env.QUEUE_URL;

console.log("Worker started...");

const pollQueue = async () => {
  const params = {
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10, 
  };

  while (true) {
    try {
      const data = await sqs.receiveMessage(params).promise();

      if (data.Messages && data.Messages.length > 0) {
        const message = data.Messages[0];

        console.log("Processing:", message.Body);

        await sqs.deleteMessage({
          QueueUrl: QUEUE_URL,
          ReceiptHandle: message.ReceiptHandle,
        }).promise();

        console.log("Done ✅");
      } else {
        console.log("No messages...");
      }

    } catch (err) {
      console.error("Error:", err);
    }
  }
};

pollQueue();
