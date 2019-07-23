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

//Transfer some DCT
const creds = new Credentials(ChainObject.parse("1.2.26"), "5JLZmqPbdicGnSGySVCVJxxDpkcbuQZEBuSfZDsPwL5KmZcwVP7");
//receiver account
const toAccount = ChainObject.parse(Settings.individualID);
let amount: number = 1;
let memo: string = "hell";
	apiwss.accountApi.transfer(creds, toAccount, AssetFormatter.DCT.amount(amount), memo)
        .subscribe((value: TransactionConfirmation) => console.log(value));

// create account credentials sender
const credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");
// send amount DCT to the individual account with encrypted 'hell' memo
 apiwss.accountApi.transfer(credentials, Settings.orgName, AssetFormatter.DCT.amount(amount), memo)
    .subscribe((confirmation) => console.log(confirmation.id));