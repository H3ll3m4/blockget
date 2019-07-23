import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";
import * as WebSocket from 'ws';
// debug logging: init rxjs-spy and log all tags
import { create } from "rxjs-spy";
const spy = create();
spy.log();

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
//look for all objects relevant to the specified accounts and subscribe to updates
let searchTerm: string[] = ["public-account-1"];
const all = api.accountApi.getFullAccounts(searchTerm)
    .subscribe(result => {
        console.log(result);
    })