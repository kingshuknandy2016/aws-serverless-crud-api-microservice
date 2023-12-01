import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const region="us-east-1";


// Dynamo DB Connection
const dynamoDBClient=new DynamoDBClient({region}); 
export { dynamoDBClient };
