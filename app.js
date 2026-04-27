const AWS = require("aws-sdk");
const http = require("http");

const sqs = new AWS.SQS({ region: "us-east-1" });

const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/677920913262/my-app-queue";

const server = http.createServer(async (req, res) => {
  const params = {
    QueueUrl: QUEUE_URL,
    MessageBody: "New job from web 🚀",
  };

  await sqs.sendMessage(params).promise();

  res.end("Job sent to worker 🚀");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
