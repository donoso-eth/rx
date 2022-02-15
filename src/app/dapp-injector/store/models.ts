export interface Web3State {
    chainStatus: NETWORK_STAATUS;
    isNetworkBusy:boolean;
    signerNetwork:string;
    walletBalance:number;
    etherToDollar:number;

    
  }

  export type NETWORK_STAATUS = 'loading' | 'fail' | 'success';