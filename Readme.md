<html><center><h1>AWS Serverless CRUD APIs of E-Commerce Product Microservices </h1></center></html>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

This is a **_AWS Serverless_** **_CRUD API_** Project. Here we have developed a **_E-commerce Product Microservice_** which reads,create,update and delete e-commerce products from DynamoDB Table.

## Features

- AWS API Gateway for RESTful API's
- AWS Lambda Synchronous Invocation
- AWS DynamoDB for Persistent Data Storage
- Standard CRUD Operations

## Architecture

![Microservices-Built-With-Node-1](/images/Architecture.png)

### Application Flow

- The client **_send requests_** to our microservices by making **_HTTP API_** Calls
- Amazon **_API Gateway hosts_** the RESTful HTTP request. The client API calls reaches here.
- After matching the **_user routes_** the api gateway passes the **_events_** to the **_Product Lambda Service_**.
- The Lambda contains the **_business logic_** to process the incoming events.
- After performing the necessary operations it passes the **_desired object_** to **_Amazon DynamoDB_** which stores microservices data and scales based on demand.

## Steps

- Create a **_Product Table_** in **_AWS DynamoDB_** using DynamoDB Console

- create a **_Lambda function_** using the AWS Lambda console.

- Create a **_API Gateway_** for Product Microservices

## Product Gateway API Design

```sh
# Root Name
+-----------+
   product
+-----------+

# And under this name, we have GET and POST methods
+--------+-----------+
  Method | URI
+--------+-----------+
  GET    | /product
  POST   | /product
+--------+-----------+


# And we have single product with id parameters
product.addResource('{id}');

+--------+---------------+
  Method | URI
+--------+---------------+
  GET    | /product/{id}
  PUT    | /product/{id}
  DELETE | /product/{id}
+--------+---------------+
```

After creating the basic API Gate way it looks like following

![API Gateway Raw](/images/API%20Gateway%20Raw.png)

And after creating the **_dev_** stage it looks like

![API Gateway With Stages(Environment)](/images/API%20Gateway%20with%20Stages.png)

All the API invocation logs are stored in **_Amazon Cloud Watch Logs_**. We have copied them and paste it [here](/api_events/)
