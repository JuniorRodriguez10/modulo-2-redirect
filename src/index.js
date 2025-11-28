const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const code = event.pathParameters.code;

  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Key: { code }
  };

  try {
    const result = await dynamo.get(params).promise();

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
    return {
      statusCode: 500,
      body: "Error interno"
    };
  }
};
