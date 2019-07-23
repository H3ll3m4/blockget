import "reflect-metadata";
import { DCoreSdk, Address } from "dcorejs-sdk";
import * as WebSocket from 'ws';
import { Settings } from './settings';
// debug logging: init rxjs-spy and log all tags
import { create } from "rxjs-spy";
const spy = create();
spy.log();

// create the API
//const apihttp = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
const apiwss = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-socket.dcore.io"));
// Get account object ids with public key addresses for example:
let address: Address[] = [Address.parse(Settings.orgPublicKey), Address.parse(Settings.individualPublicKey)];
apiwss.accountApi.findAllReferencesByKeys(address)
    .subscribe((address) => console.log(address));