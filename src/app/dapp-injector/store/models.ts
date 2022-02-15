export interface Web3State {
    chainStatus: NETWORK_STAATUS;
    isNetworkBusy:boolean;
    walletBalance:number;
    etherToDollar:number;
    
  }

  export type NETWORK_STAATUS = 'loading' | 'fail' | 'success';