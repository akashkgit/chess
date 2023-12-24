
import { PutItemCommand,DynamoDBClient } from "@aws-sdk/client-dynamodb";
const client= new DynamoDBClient({});
// the client uses the credentials file in the server
/**
 * 
 * @param tablename 
 * @param items {field:{typeinCaps:"value"/["value"]}}
 * @returns 
 */

export async function insertInto(tablename,items){
    const command = new PutItemCommand({
        TableName:tablename,
        Item:items,
    })
    const rep=await client.send(command);
    return rep;
}