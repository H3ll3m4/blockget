import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";
import * as WebSocket from 'ws';
// debug logging: init rxjs-spy and log all tags
import { create } from "rxjs-spy";
const spy = create();
spy.log();

// create the API
//const apihttp = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
const apiwss = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-socket.dcore.io"));
// Get all accounts that refer to the account id in their owner or active authorities.
//let accountId: ChainObject = ChainObject.parse("1.2.16");
//let accountId: ChainObject = ChainObject.parse("1.2.26");
let accountId: ChainObject = ChainObject.parse("1.2.27");
apiwss.accountApi.findAllReferencesByAccount(accountId)
    .subscribe((accountId) => console.log(accountId));
