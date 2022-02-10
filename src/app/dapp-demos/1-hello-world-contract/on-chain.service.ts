import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularContract, AngularNetworkProvider,AngularWallet, ICONTRACT, Web3Actions } from 'angular-web3';
import { Contract} from 'ethers'
import { providers } from 'ethers';
import { startUpConfig } from './blockchain_wiring';
import { uniswap_abi } from './uniswap_abi';


@Injectable({
  providedIn: 'root'
})
export class OnChainService {
  private _dollarExchange!: number;
  myProvider!: AngularNetworkProvider;
  newWallet!: AngularWallet;
  helloWorldContract!: AngularContract;
  constructor( @Inject('contractMetadata') public contractMetadata:ICONTRACT,
  private store:Store

 ) { }


 async createProvider(url_array:string[]) {
  let provider;
  if(url_array.length == 0){
    provider = new providers.JsonRpcProvider()
  } else {
  const p_race = await Promise.race(
    url_array.map((map) => new providers.JsonRpcProvider(map))
  );
  provider = await p_race;
  }
 
  //this._signer = this._provider.getSigner();
  return provider
}

  async getDollarEther() {
    if (this._dollarExchange == undefined) {

    const uniswapUsdcAddress = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc";
    const uniswapAbi = uniswap_abi;
    
   const uniswapService = new AngularNetworkProvider([
    "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
    `https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
    "https://rpc.scaffoldeth.io:48544",
  ])

   await uniswapService.init()

  const getUniswapContract = async (address:string) =>
    await new Contract(address, uniswapAbi, uniswapService.Provider);
    const contract = await getUniswapContract(uniswapUsdcAddress);
    const reserves = await contract['getReserves']();
  
    this._dollarExchange =
      (Number(reserves._reserve0) / Number(reserves._reserve1)) * 1e12;

    }
    return this._dollarExchange
  }

  async init(){

    const config = startUpConfig

    this.store.dispatch(Web3Actions.loadChain());
    
    if (config.wallet== 'metamask') {
      console.log('Check if 🦊 injected provider');
      let ethereum = (window as any).ethereum;
      if (!!(window as any).ethereum) {
        const provider = new providers.Web3Provider(ethereum, 'any');

        this.store.dispatch(Web3Actions.providerSet({provider}))

        const addresses = await provider.listAccounts();
        console.log(addresses);
        if (addresses.length > 0) {
          const providerNetwork = provider && (await provider.getNetwork());
          const signer = await provider.getSigner()

          console.log(providerNetwork)
          this.store.dispatch(Web3Actions.signerSet({signer}))
           const contract = await new Contract(
            this.contractMetadata.address,
            this.contractMetadata.abi,
            signer
          );;
            
          this.store.dispatch(Web3Actions.contractSet({contract}))  

          this.store.dispatch(Web3Actions.chainLoaded())

         // console.log(await (provider.getAvatar()))


        } else {
          
        }
      } else {
      }

     

    }  else {
     ////// local wallet 
      const provider = await this.createProvider([])
      this.store.dispatch(Web3Actions.providerSet({provider}))
    }
    
 





    this.newWallet = new  AngularWallet()
    const mywallet =  await this.newWallet.init(this.myProvider.Provider)
    this.helloWorldContract=  new AngularContract(this.helloWorldContractMetadata)
    await this.helloWorldContract.init(this.myProvider.Provider,mywallet)
  }
}
