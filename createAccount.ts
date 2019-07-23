import "reflect-metadata";
import { ECKeyPair, ChainObject, Credentials, DCoreSdk, Fee, Address} from "dcorejs-sdk";
import { create } from "rxjs-spy";
import { Settings } from './settings';
//import * as WebSocket from "ws";
// debug logging: init rxjs-spy and log all tags
const spy = create();
spy.log();

//const apiwss = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));
const apihttp = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })

//https://docs.decent.ch/CreateAccount/index.html
//DCoreJS-SDK/src/models/operation/AccountCreateOperation.ts
let name: string = "New user";

//Create New account from scratch and generating the key:
if (process.argv[2] != null){
    const registrarCred: Credentials = new Credentials(ChainObject.parse("1.2.26"), "5JLZmqPbdicGnSGySVCVJxxDpkcbuQZEBuSfZDsPwL5KmZcwVP7");
    name = process.argv[2];
    const keys = ECKeyPair.generate()
    const PUBLIC_KEY = keys.publicAddress;
    
    apihttp.accountApi.create(registrarCred, name , PUBLIC_KEY)
                   .subscribe(transaction => console.log(transaction))

    // suggest to save the private key  
    }else{
        const registrar = ChainObject.parse("1.2.27"); //credentials used to register the new account
        name = Settings.individualName; //new account name
        const address: Address = Address.parse(Settings.individualPublicKey); //new account public key address

        let fee: Fee = undefined;
        apihttp.accountApi.createAccountOperation(registrar, name, address, fee)
            .subscribe((confirmation) => console.log("Confirmation Authority " + confirmation.active + "and Fee" + confirmation.fee + "and Registrar" + confirmation.registrar));
    }

//check if it exists:
apihttp.accountApi.exist(name)
    .subscribe(result => console.log(result))

apihttp.accountApi.get(name)
    .subscribe((account) => console.log(account.id))
