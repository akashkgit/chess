import { createHmac } from "node:crypto";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
const salt="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\
pmMI0oIw2mbAfRgTozT5hbJ9ngc=";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async (emailId,connectionId) => {
  console.log(emailId," us thge email idididididii")
  let query={
    TableName: "chessUsers",
    Key:{
      "emailId":emailId
    },
    UpdateExpression: "Set connectionId= :connectionId",
    ExpressionAttributeValues:{
      
      ":connectionId":connectionId
    },
    ReturnValues:"ALL_NEW"
    
  }
  console.log(" query is ",query)
  const command = new UpdateCommand(query);

  const response = await docClient.send(command);
  console.log(response);
  return response;
};


export const handler = async (event,context) => {
  
  console.log("event is ",event," context is",context);
  const connectionId = event.requestContext.connectionId;
  
  
  let jwt=JSON.parse(event.body).jwt;
  console.log(" jwt is :;;;;;;;; ",jwt,event)
  
  let [header,body,signature]=jwt.split(".");
  
  let headerA=Buffer.from(header,'base64').toString()
  let bodyA=Buffer.from(body,'base64').toString()
  let sigA=Buffer.from(signature,'base64').toString()
  console.log("\n--------------------'\n',bodyA.iss,'\n-----------\n");
  
  console.log(headerA,bodyA,sigA," are the decoded values");
const hash = createHmac('sha256', salt)
              .update(header+"."+body)
              .digest('hex');
  console.log(" HASH MACTH ------>",hash===sigA,hash===undefined?"null":hash);
  try{
    if(sigA===hash){
   
    let authorized=await main(JSON.parse(bodyA)["sub"],connectionId);
   
  }
  return {
    statusCode: 200,
    body:JSON.stringify({authorized:sigA===hash,type:"auth"})

  }
    
  }
    
    catch(err){
      console.log('errrrrrrorororororororor ',err)
      return {
    statusCode: 200,
    authorized:false,
    error:err

  };
    }
    
  }
  
