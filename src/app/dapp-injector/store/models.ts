export interface Web3State {
    initializing:boolean;
    chainIsReady: boolean;
    provider:{[key:string]: any}
    signer:any,
    contract:{[key:string]: any}
    isNetworkBusy:boolean;
    
  }