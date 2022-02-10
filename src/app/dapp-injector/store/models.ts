export interface Web3State {
    initializing:boolean;
    chainIsReady: boolean;
    provider:{[id:number]: any}
    signer:any,
    contracts:{[id:number]: any}
    isNetworkBusy:boolean;
    
  }