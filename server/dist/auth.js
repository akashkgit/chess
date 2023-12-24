"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.main = void 0;
var node_crypto_1 = require("node:crypto");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var salt = "b3BlbnNzaC1rZXktdjEAAAAACmFlczI1Ni1jdHIAAAAGYmNyeXB0AAAAGAAAABCVm1bScxt9HVG/6mDKXtFWAAAAEAAAAAEAAAGXAAAAB3NzaC1yc2EAAAADAQABAAABgQDZagYUPAaKSeYisoApY1vRNaSc7Z1YgXtX3J9C/QP+TIHOBA780Z6GPPH3jQql7SK4yUKQo7PgUd+Dxh2YeegUb9CBaNPo3vibpbTzl4tmODICyRRd/k+x7I9tk12/BYgTNA8xfIoJpyqekD/UBXpAH4k03WS7AUYyha0dP/JxuzOtPWZ0IihamCtJavmDErzyFgkFNAcrMf1aO22qZjvfc9XmeiMadANvjexF5ePIRy3Zscx3DKFfl+dP9leokH6VeulXdvoKtABvJOTRYbwfBN+aZQNCbY/s9dBiIeW6pIqzwEXJe2QeiUjdyC/eETDn1dD1JUhy7Y2OMouNo9g3WSbL8BuEPHNOCudfM2lQ8GaijMh+NheHBCQKpalW0VnZddFPeBh6DAUVmjKF8hX1U/PJC9pIfqNEHjlBTfXMy1GWwsZt7ljwnhba7bKxPckxAbdDiZhabVlhsbGrQl1J4ttdM8QKNJSQeXMkhhMqsvbMtgxSloE0VJRLKIkkEBkAAAWQnHTzGClxKSs3fvXVQ0/c6BO0OOFtHzk4R93odBowEVIvxYkzxB65/1aKtaN5yL86zjR4kDGBM2k8GXxXym7al7Kfj5ysp6a9yhVnW18k5Hwy6FLOhilyPodOiZ1wkHVhD5JzTX7riWofe2E7/AQM/kbOT82P/+zAyDc1VD5qKOB50+8II/aO2wiSGjQKqJDz4U0vU3bcRAsHCdxnCwyqAr/AVUpRcr9oqQ5y/julG87CzzQclCKRELN6tfBweDD2f0PLhwFpDJV6OZkdNGpI9jMj/AVn5/+ZjZk3whTJFeeTUaqsxRf+K2xjawnyLwcy8rQUcrWi4CTT1pNyfmWktfXlJ8LdMgzuTaFjExGgnf6JJSikEGluw11YoafnaJKcVr8maz69CaChy4ufVkrHmLFJUxkMUKsjakxu4Bg9w9UTu+v9lS0kXBxUT2g97TQkZYVAQ2hXi5+pywNFzZjUoA41w0MbtFVjC86YGKFSYNtedaxDhBwadtHB2D4t3qSnxKCwTXCnpDH/AoP//lKoDaqC1aetIUrvyuCHEdC7MdVbipDVchUBwrG7Eac5vj56UQUj1yKT2Qr55SZaqLUjxMD0gdCUjIO9fXbJsQd3206jp6dgK/nuetcx2PABDHch8hZlfO/aHz0auYkPx2hhHlP9EA3/FSfJryWgm3/EsywyGp+HCFLuhm2lFPKyPwPUWwAu9DO/sfxTuVuT2NyKk2y/ALSJNwqWwOTjFQQkBj9B8E7xna9iLAhb4cUOTm8HgwkhIahMFhPXNi62XkT2dG8ttBVmf8lHj2+yM/DZtjViidnTt+xcPVy7agVWtP1m6RpwKgQHQyqZDDOMUvyWxHn/TrWrS0FtiElUYlv8m9oed1B1C2Kh1MFopYXAeAOU6HjS2b4VRHSVmnTPZI978UtXjBNii+eK76u9/iK2cIm84p4HZnjtVAMEnSmbXftscSvyQ4EL8es0yrUMjty6ASbfUzVLW/VAz3aqmElIcYVqwuM33CzgHnFFtcVko54bLVJpltCsPMKigA9ASFOOoH+zqD71RbEDWcRP9Z2OMX5XtSoIsyBBw/AY9UgpUq4xOlfYFqp8q/WynM+\
mqxoPcmuND4dsn6IhpqsDJ9yKKLGYbVR2stffirWDOSZtnFWOb5BHLx0cH05gDyYah4FMk+\
73lA4eMug14ALa//7cj4AvMwmNuGT5jZA1fvF+VrB7loTo50p03e+wGRjL0OLN2qUeaSHS+\
1Y07AYcXUd/3sUjde5kokF6rfHD/1AANPip3Q2GanwVX4FEfT2ntDeUQkkZXkbZ5Frc6Kv+\
SgQEHtcy8nZR73vNFeCKgd/TFUsJ8IXZD9Uk58JGO2YT7p5yHscS7UC6DTwoIW4XSXxEao+\
F4pnfwDcmgI/u64yJTUUvm2VTpQMcVFXDdEfKUCGwxByfYBQKE2gnvRVrc7wjy5fo7FMLf+\
uwAl4sOCqWzmi+DPUH8gvNQOT1CNxYey+MF6Rjr3Gx3gV4G6FHH69c0e2A+JM+6q+sTpCB+\
q4IEDgBlCj5P7aqHMYyAeBaKstsFzesbBdKHvCTHF5nXx/vTADqOFh4/xPc4MvRL3BonUd+\
zbFWaWi+XELLCOnV7qpVSDXOobcrVZnDFWSxlNQLH+Vpl2vOD70p0FGBDHU7Sj+gUyyE9k+\
oNzl0d8qTi2B5bWrB1D0BOYqQZfxub7x+jWqEAUfIVGY3hwnR8gFYRTfH3BD87l1x/XEfT+\
0OD4Sio79xjSX4OTCEZ5d2VLx8S0TWmqUw+9q/7GnaoUgiy9ApwuI82Svn5ni4TvCjByNp+\
EHz5DdLyLk6p+YbDgSBt0chJCdpMKwpYEGrwILF9LEJl1f+uWfvA1Yn6I3ySrSWhsZKEnP+\
pmMI0oIw2mbAfRgTozT5hbJ9ngc=";
var client = new client_dynamodb_1.DynamoDBClient({});
var docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
var main = function (emailId, connectionId) { return __awaiter(void 0, void 0, void 0, function () {
    var query, command, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(emailId, " us thge email idididididii");
                query = {
                    TableName: "chessUsers",
                    Key: {
                        "emailId": emailId
                    },
                    UpdateExpression: "Set connectionId= :connectionId",
                    ExpressionAttributeValues: {
                        ":connectionId": connectionId
                    },
                    ReturnValues: "ALL_NEW"
                };
                console.log(" query is ", query);
                command = new lib_dynamodb_1.UpdateCommand(query);
                return [4 /*yield*/, docClient.send(command)];
            case 1:
                response = _a.sent();
                console.log(response);
                return [2 /*return*/, response];
        }
    });
}); };
exports.main = main;
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var connectionId, jwt, _a, header, body, signature, headerA, bodyA, sigA, hash, authorized, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("event is ", event, " context is", context);
                connectionId = event.requestContext.connectionId;
                jwt = JSON.parse(event.body).jwt;
                console.log(" jwt is :;;;;;;;; ", jwt, event);
                _a = jwt.split("."), header = _a[0], body = _a[1], signature = _a[2];
                headerA = Buffer.from(header, 'base64').toString();
                bodyA = Buffer.from(body, 'base64').toString();
                sigA = Buffer.from(signature, 'base64').toString();
                console.log("\n--------------------'\n',bodyA.iss,'\n-----------\n");
                console.log(headerA, bodyA, sigA, " are the decoded values");
                hash = (0, node_crypto_1.createHmac)('sha256', salt)
                    .update(header + "." + body)
                    .digest('hex');
                console.log(" HASH MACTH ------>", hash === sigA, hash === undefined ? "null" : hash);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!(sigA === hash)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.main)(JSON.parse(bodyA)["sub"], connectionId)];
            case 2:
                authorized = _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/, {
                    statusCode: 200,
                    body: JSON.stringify({ authorized: sigA === hash, type: "auth" })
                }];
            case 4:
                err_1 = _b.sent();
                console.log('errrrrrrorororororororor ', err_1);
                return [2 /*return*/, {
                        statusCode: 200,
                        authorized: false,
                        error: err_1
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
