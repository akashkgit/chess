
import express from "express";
import { insertInto } from "./awsClient";
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send(" bellow ");
})
app.options("/token/:type", (req, res) => {
    console.log(" incoming req... for type " + req.params.type + " | ");

    console.log(" preflight cors check");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", ["Content-Type"])
    res.header("Access-Control-Allow-Methods", "POST")
    console.log(res.getHeaders())
    res.send("bello");


})


app.post("/token/:type", async (req, res) => {
    // console.log(req.body)
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", ["Content-Type"])
    res.header("Access-Control-Allow-Methods", "POST")
    
    let result = "";
    let credObj = req.body;
    console.log(typeof credObj,"------",credObj,"\n------\n",credObj.credential)
    // let credObj= (JSON.parse(req.body));

    let splitted = credObj.credential.split(".");
    let header = atob(splitted[0]);
    let body: { [idx: string]: any } = JSON.parse(atob(splitted[1]));
    let signature = splitted[2];
    let verify = async (client) => {
        const ticket = await client.verifyIdToken({
            idToken: credObj.credential,
            audience: "409051565209-nd3hjg4eqsq0hljd8ko9a7tiv0f7orkm.apps.googleusercontent.com"
        })
    }
    if ("https://accounts.google.com" === body.iss) {
        const { OAuth2Client } = require('google-auth-library')
        const client = new OAuth2Client();

        result = await verify(client).then((res) => "verified").catch((res) => " unverfied ");
        if ("verified" === result) {
            console.log(body);
            let items = {
                jwt: {
                    S: credObj.credential
                },
                emailId: {
                    S: body.email,
                },
                name: {
                    S: body.name
                },
                picture: {
                    S: body.picture
                }

            }
            if ("signup" === req.params.type) insertInto("chessUsers", items).then((val) => console.log(" succ:", val)).catch((err) => console.log("err :", err));
            if("verification" === req.params.type)  res.status(200).json({ result: "verified", jwt: credObj.credential, "url": "play", "username": body.name, authorized:true});
            else res.status(200).json({ result: " successefully verified ", jwt: credObj.credential, "url": "play", "username": body.name });
        }
        else  res.status(200).json({ result: "unverified", jwt: credObj.credential, "url": "login", authorized:false});
    }





})
app.listen(3000, () => {
    console.log(" listening server..");
})