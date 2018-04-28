const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }
    console.log('Save account action triggered');
    console.log('With event: ', event);

    // Because we're using a Cognito User Pools authorizer, all of the claims
    // included in the authentication token are provided in the request context.
    // This includes the username as well as other attributes.
    const username = event.requestContext.authorizer.claims['cognito:username'];

    // The body field of the event in a proxy integration is a raw string.
    // In order to extract meaningful values, we need to first parse this string
    // into an object. A more robust implementation might inspect the Content-Type
    // header first and use a different parsing strategy based on that value.
    console.log('Received request: ', event.body);
    
    // const requestBody = JSON.parse(event.body);
    readAll(event.queryStringParameters.tableName, function (data) {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }, function (err) {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
        
    });
};

function readAll(data, onSuccess, onError) {
    console.log('Reading all records from: ', data);
    var accum = [];
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            onError(err);
        } else {
            // print all the movies
            console.log("Scan succeeded.");
            data.Items.forEach(function(movie) {
                accum.push(movie);
            });
    
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                ddb.scan({
                    TableName: data,
                }, onScan);
            } else {
                onSuccess(accum);
            }
        }
    };
    ddb.scan({
        TableName: data,
    }, onScan);
};


function executeRequest(requestBody) {
    console.log('Execute request: ', requestBody);
    return saveRecord(requestBody);
};

function createResponse() {
    return {};
};

function saveRecord(data) {
    console.log('Saving data: ', data);
    console.log('Saving ' + data.tableName + ": ", data.record);
    return ddb.put({
        TableName: data.tableName,
        Item: data.record,
    }).promise();
};

function createId() {
    return toUrlString(randomBytes(16));
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
