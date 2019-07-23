import "reflect-metadata";
import { AssetAmount, AssetFormatter, ChainObject, Credentials, DCoreSdk,  TransactionConfirmation } from "dcorejs-sdk";
import * as WebSocket from 'ws';
import { Settings } from './settings';
// debug logging: init rxjs-spy and log all tags
import { create } from "rxjs-spy";
const spy = create();
spy.log();

// create the API
//const apihttp = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" }) 
//callbacks not available through HTTP API
const apiwss = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-socket.dcore.io"));
//const creds = new Credentials(ChainObject.parse("1.2.26"), "5JLZmqPbdicGnSGySVCVJxxDpkcbuQZEBuSfZDsPwL5KmZcwVP7"); // public-account-8
const creds = new Credentials(ChainObject.parse(Settings.orgID), Settings.orgPrivateKey);

//receiver account
let memo: string = "hello";
let destAccount: string = Settings.individualID;
apiwss.messageApi.send(creds, [[ChainObject.parse(destAccount), memo]])
        .subscribe((value: TransactionConfirmation) => console.log(value));

