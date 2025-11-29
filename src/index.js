const {
  DynamoDBClient
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const code = event.pathParameters.code;

  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Key: { code }
  };

  try {
    const result = await dynamo.send(new GetCommand(params));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "text/html" },
        body: `
          <h1>404 - Not Found</h1>
          <p>El código "${code}" no existe.</p>
        `
      };
    }

    return {
      statusCode: 302,
      headers: {
        Location: result.Item.url
      },
      body: ""
    };

  } catch (err) {
    console.error("ERROR:", err);
    return {
      statusCode: 500,
      body: "Error interno"
    };
  }
};
