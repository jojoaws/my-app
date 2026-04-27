const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ region: "us-east-1" });

const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/677920913262/my-app-queue";

console.log("Worker started...");

const pollQueue = async () => {
  const params = {
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  };

  try {
    const data = await sqs.receiveMessage(params).promise();

    if (data.Messages) {
      const message = data.Messages[0];

      console.log("Processing:", message.Body);

      await sqs.deleteMessage({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      }).promise();

      console.log("Done ✅");
    }
  } catch (err) {
    console.error(err);
  }

  setTimeout(pollQueue, 2000);
};

pollQueue();
