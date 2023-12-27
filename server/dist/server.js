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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var awsClient_1 = require("./awsClient");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send(" bellow ");
});
app.options("/token/:type", function (req, res) {
    console.log(" incoming req... for type " + req.params.type + " | ");
    console.log(" preflight cors check");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", ["Content-Type"]);
    res.header("Access-Control-Allow-Methods", "POST");
    console.log(res.getHeaders());
    res.send("bello");
});
app.post("/token/:type", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, credObj, splitted, header, body, signature, verify, OAuth2Client, client, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // console.log(req.body)
                res.header("Access-Control-Allow-Origin", "http://localhost:8080");
                res.header("Access-Control-Allow-Headers", ["Content-Type"]);
                res.header("Access-Control-Allow-Methods", "POST");
                result = "";
                credObj = req.body;
                console.log(typeof credObj, "------", credObj, "\n------\n", credObj.credential);
                splitted = credObj.credential.split(".");
                header = atob(splitted[0]);
                body = JSON.parse(atob(splitted[1]));
                signature = splitted[2];
                verify = function (client) { return __awaiter(void 0, void 0, void 0, function () {
                    var ticket;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, client.verifyIdToken({
                                    idToken: credObj.credential,
                                    audience: "409051565209-nd3hjg4eqsq0hljd8ko9a7tiv0f7orkm.apps.googleusercontent.com"
                                })];
                            case 1:
                                ticket = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                if (!("https://accounts.google.com" === body.iss)) return [3 /*break*/, 2];
                OAuth2Client = require('google-auth-library').OAuth2Client;
                client = new OAuth2Client();
                return [4 /*yield*/, verify(client).then(function (res) { return "verified"; }).catch(function (res) { return " unverfied "; })];
            case 1:
                result = _a.sent();
                if ("verified" === result) {
                    console.log(body);
                    items = {
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
                    };
                    if ("signup" === req.params.type)
                        (0, awsClient_1.insertInto)("chessUsers", items).then(function (val) { return console.log(" succ:", val); }).catch(function (err) { return console.log("err :", err); });
                    if ("verification" === req.params.type)
                        res.status(200).json({ result: "verified", jwt: credObj.credential, "url": "play", "username": body.email, authorized: true });
                    else
                        res.status(200).json({ result: " successefully verified ", jwt: credObj.credential, "url": "play", "username": body.email });
                }
                else
                    res.status(200).json({ result: "unverified", jwt: credObj.credential, "url": "login", authorized: false });
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log(" listening server..");
});
