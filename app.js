const AWS = require("aws-sdk");
const http = require("http");

const sqs = new AWS.SQS({
  region: process.env.AWS_REGION,
});

const QUEUE_URL = process.env.QUEUE_URL;

const server = http.createServer(async (req, res) => {


  if (req.url === "/") {
    res.end("OK");
  }

  else if (req.url === "/job") {

    try {

      const params = {
        QueueUrl: QUEUE_URL,
        MessageBody: "Job from web 🚀",
      };

      await sqs.sendMessage(params).promise();

      console.log("Message sent to SQS");

      res.end("Job sent 🚀");

    } catch (err) {

      console.error("SQS error:", err);

      res.statusCode = 500;
      res.end("Error sending job");
    }

  }

  else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("QUEUE_URL:", QUEUE_URL);
});
