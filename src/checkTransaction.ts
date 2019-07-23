import "reflect-metadata";
import { DCoreSdk } from "dcorejs-sdk";
import { create } from "rxjs-spy";
import * as WebSocket from "ws";
// debug logging: init rxjs-spy and log all tags
const spy = create();
spy.log();

// create api for websocket
const apiwss = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io/"));

// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

apiwss.transactionApi.getById(process.argv[2])
    .subscribe((confirmation) => console.log(confirmation.id));

//let transactionID : string = "5f4acd9f759f60232a8a1f14ecb882d923a83d86";//"1626283905675a3a44ef448e6a212d516433eec6";
//apiwss.transactionApi.getById(transactionID)
//    .subscribe((confirmation) => console.log(confirmation.id));

