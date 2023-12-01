
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { dynamoDBClient } from "../dynamoDBClient.js";

export const handler = async (event,context) => {
    console.log("request:", JSON.stringify(event, undefined, 2));
    let body;
    let response;
    try {
        switch(event.httpMethod){
        case "GET":
            if (event.queryStringParameters != null) {
                body = await getProductsByCategory(event);
            }
            else if(event.pathParameters!=null){
                body=await getProduct(event.pathParameters.id);
            }else{
                // eslint-disable-next-line no-unused-vars
                body=await getAllProducts();
            }
            break;
        case "POST":
            body= await createProduct(event);
            break;
        case "DELETE":
            body=await deleteProduct(event.pathParameters.id);
            break;
        case "PUT":
            body= await updateProduct(event);
            break;
        default:
            throw new Error(`Unsupported route: "${event.httpMethod}"`);
        }
        // TODO implement
        response = {
            statusCode: 200,            
            body: JSON.stringify({
                message: `Successfully finished operation: "${event.httpMethod}"`,
                body: body
            })
        };
        
    } catch (error) {
        console.log(error);
        response ={
            statusCode: 500,
            body:JSON.stringify({
                message: "Failed to perform operation.",
                errorMsg: error.message,
                errorStack: error.stack,
            })
        };
    }

    return response;
};


const getProduct=async (productId)=>{
    console.log("getProduct");
    try {
        const params = {
            // eslint-disable-next-line no-undef
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ id: productId })
        };
        const { Item } = await dynamoDBClient.send(new GetItemCommand(params));

        console.log(Item);
        return (Item) ? unmarshall(Item) : {};
    
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const getAllProducts=async ()=>{
    console.log("getAllProducts");
    try {
        const params = {
            // eslint-disable-next-line no-undef
            TableName: process.env.DYNAMODB_TABLE_NAME,
        };
        const { Items } = await dynamoDBClient.send(new ScanCommand(params));

        console.log(Items);
        return (Items) ? Items.map(item=>unmarshall(item)) : {};
    
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// xxx/product/1?category=Phone
const getProductsByCategory = async (event) => {
    console.log("getProductsByCategory");
    try {
        const productId = event.pathParameters.id;
        const category = event.queryStringParameters.category;
  
        const params = {
            KeyConditionExpression: "id = :productId",
            FilterExpression: "contains (category, :category)",
            ExpressionAttributeValues: {
                ":productId": { S: productId },
                ":category": { S: category }
            },      
            // eslint-disable-next-line no-undef
            TableName: process.env.DYNAMODB_TABLE_NAME
        };
   
        const { Items } = await dynamoDBClient.send(new QueryCommand(params));
  
        console.log(Items);
        return Items.map((item) => unmarshall(item));
    } catch(e) {
        console.error(e);
        throw e;
    }
};

const createProduct = async (event) => {
    try {
        console.log(`createProduct function. event : "${event}"`);
  
        const productRequest = JSON.parse(event.body);
        // set productid
        const productId = uuidv4();
        productRequest.id = productId;
  
        const params = {
            // eslint-disable-next-line no-undef
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(productRequest || {})
        };
  
        const createResult = await dynamoDBClient.send(new PutItemCommand(params));
        console.log(createResult);
        return createResult;
  
    } catch(e) {
        console.error(e);
        throw e;
    }
};

const deleteProduct = async (productId) => {
    try {
        console.log(`deleteProduct function. productId : "${productId}"`);
  
        const params = {
            // eslint-disable-next-line no-undef
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ id: productId })
        };  
  
        const deleteResult = await dynamoDBClient.send(new DeleteItemCommand(params));
        console.log(deleteResult);
        return deleteResult;
  
    } catch(e) {
        console.error(e);
        throw e;
    }
};

const updateProduct = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const objKeys = Object.keys(requestBody);
        console.log(`updateProduct function. requestBody : "${requestBody}", objKeys: "${objKeys}"`);
  
        const params = {
            // eslint-disable-next-line no-undef
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ id: event.pathParameters.id }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: requestBody[key],
            }), {})),
        };
  
        const updateResult = await dynamoDBClient.send(new UpdateItemCommand(params));
        console.log(updateResult);
        return updateResult;
  
    } catch(e) {
        console.error(e);
        throw e;
    }
};