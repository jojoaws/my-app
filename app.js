const AWS = require("aws-sdk");
const http = require("http");

const sqs = new AWS.SQS({ region: process.env.AWS_REGION });

const QUEUE_URL = process.env.QUEUE_URL;

const server = http.createServer(async (req, res) => {
  const params = {
    QueueUrl: QUEUE_URL,
    MessageBody: "Job from web 🚀",
  };

  await sqs.sendMessage(params).promise();

  res.end("Job sent 🚀");
});

server.listen(3000, () => {
  console.log("Server running");
});
