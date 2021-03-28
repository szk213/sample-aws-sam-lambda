const { DynamoDBClient } = require("./dynamodb-client");
const tableName = process.env.DYNAMO_DB_TABLE_NAME;
const dynamoDbClient = new DynamoDBClient(tableName);

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    console.log(`event:${JSON.stringify(event)}`);
    console.log(`context:${JSON.stringify(context)}`);
    console.log("Start registration to dynamo db");
    const dbOutput = await dynamoDbClient.put(event);
    return {
      statusCode: 200,
      body: JSON.stringify(dbOutput),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
  //   try {
  //     // const ret = await axios(url);
  //     response = {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         message: "hello world",
  //         // location: ret.data.trim()
  //       }),
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }

  //   return response;
};
