const AWS = require('aws-sdk')

class DynamoDBClient {
  constructor(tableName) {
    console.log("DynamoDBClientクライアント内部");
    const endpoint = process.env.DYNAMO_DB_ENDPOINT;
    const config = endpoint !== "" ? { endpoint } : { region: 'ap-northeast-1' };

    this.documentClient = new AWS.DynamoDB.DocumentClient(config);
    this.tableName = tableName;
  }

  async scan() {
    return this.documentClient.scan({ TableName: this.tableName }).promise();
  }

  async put(itemParams) {
    const dbParams = {
      TableName: this.tableName,
      Item: itemParams,
    }

    return this.documentClient.put(dbParams).promise();
  }
}

exports.DynamoDBClient = DynamoDBClient;