const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ region: "us-east-1" });

const QUEUE_URL = "YOUR_SQS_QUEUE_URL";

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

      console.log("Processing message:", message.Body);

      await sqs.deleteMessage({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      }).promise();

      console.log("Message processed and deleted ✅");
    }
  } catch (err) {
    console.error("Error:", err);
  }

  setTimeout(pollQueue, 2000);
};

pollQueue();
