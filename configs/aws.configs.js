const AWS = require('aws-sdk')
require("dotenv").config();


const config = new AWS.Config({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
})

AWS.config = config;
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;