<html><center><h1>E-Commerce Product Microservices with AWS Lambda, API Gateway and DynamoDB</h1></center></html>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

We have implemented synchronous serverless CRUD operation using ***API Gateway***,***Lambda*** and ***DynamoDB*** AWS SDK Libraries

## Architecture
![Microservices-Built-With-Node-1](/images/Architecture.png)


## Steps

* Create a ***Product Table*** in ***AWS DynamoDB*** using DynamoDB Console

* create a ***Lambda function*** using the AWS Lambda console.

* Create a ***API Gateway*** for Product Microservices

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

And after creating the ***dev***  stage it looks like

![API Gateway With Stages(Environment)](/images/API%20Gateway%20with%20Stages.png)

All the API invocation logs are stored in ***Amazon Cloud Watch Logs***. We have copied them and paste it [here](/api_events/)