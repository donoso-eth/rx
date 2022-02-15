export interface Web3State {
    chainStatus: 'loading' | 'fail' | 'success';
    isNetworkBusy:boolean;
    walletBalance:number;
    etherToDollar:number;
    
  }