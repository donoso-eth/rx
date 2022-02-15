import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { ContractInputComponent } from '../contract-input/contract-input.component';

import { ethers, Signer } from 'ethers';
import {
  BlockWithTransactions,
  convertEtherToWei,
  convertUSDtoEther,
  convertWeiToEther,
  DappInjectorService,
  DialogService,
  displayEther,
  displayUsd,
  IABI_OBJECT,
  IBALANCE,
  ICONTRACT,
  IINPUT_EVENT,
  NotifierService,
  Web3Actions,
  web3Selectors,
  Web3State
} from 'angular-web3';
import { Store } from '@ngrx/store';
import { AngularContract } from 'src/app/dapp-injector/classes/contract';

@Component({
  selector: 'debug-contract',
  templateUrl: './debug-contract.component.html',
  styleUrls: ['./debug-contract.component.css'],
})
export class DebugContractComponent implements AfterViewInit {
  blocks: Array<BlockWithTransactions> = [];
  contract_abi!: Array<IABI_OBJECT>;
  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT;
  deployer_address!: string;
  active = 1;
  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  componentInstances: Array<ContractInputComponent> = [];
  stateInstances: Array<ContractInputComponent> = [];
  events: Array<any> = [];
  eventsAbiArray: Array<any> = [];

  //blockchain_is_busy = true;

  newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  myContract!: AngularContract ;
  blockchain_is_busy: boolean = true;
  constructor(
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private notifierService: NotifierService,
    private dappInjectorService: DappInjectorService,
    private store: Store<Web3State>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @ViewChild('inputContainer', { read: ViewContainerRef })
  inputContainer!: ViewContainerRef;

  @ViewChild('stateContainer', { read: ViewContainerRef })
  stateContainer!: ViewContainerRef;

  @ViewChild('payableContainer', { read: ViewContainerRef })
  payableContainer!: ViewContainerRef;



  async refreshContractBalance() {
    const balance = await this.dappInjectorService.config.providers[
      'main'
    ].getBalance(this.contractHeader.address);
    const ehterbalance = convertWeiToEther(balance);
    const dollar =
      ehterbalance * (await this.dappInjectorService.getDollarEther());
    this.contractBalance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
  }

    async onChainStuff() {
    try {
      this.deployer_address = await (
        await this.dappInjectorService.config.providers['main'].getSigner()
      ).getAddress();

      this.dappInjectorService.config.providers['main'].on(
        'block',
        async (log: any, event: any) => {
          this.refreshContractBalance();

          const block = await this.dappInjectorService.config.providers[
            'main'
          ].getBlockWithTransactions(log);
          this.blocks = [block].concat(this.blocks);
        }
      );

    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }


  
  async addBlock(blockNr: number) {
    const block = await this.dappInjectorService.config.providers[
      'main'
    ].getBlockWithTransactions(blockNr);
    this.blocks = this.blocks.concat(block);
  }

  async doFaucet() {
    this.store.dispatch(Web3Actions.chainBusy({status:true}))
    let amountInEther = '0.1';
    // Create a transaction object

    let tx = {
      to: await this.dappInjectorService.config.signer?.getAddress(),
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    };

    // Send a transaction
    const transaction_result = await this.dappInjectorService.doTransaction(
      tx,
      true
    );
    this.store.dispatch(Web3Actions.chainBusy({status:false}))
    await this.notifierService.showNotificationTransaction(transaction_result);
  }

  async openTransaction() {
 
 
    const res = await this.dialogService.openDialog();

    if (res && res.type == 'transaction') {
      const usd = res.amount;
      const amountInEther = convertUSDtoEther(
        res.amount,
        await this.dappInjectorService.getDollarEther()
      );
      const amountinWei = convertEtherToWei(amountInEther);

      let tx = {
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei,
      };
      this.store.dispatch(Web3Actions.chainBusy({status:true}))
      const transaction_result = await this.dappInjectorService.doTransaction(
        tx
      );
      this.store.dispatch(Web3Actions.chainBusy({status:false}))
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      this.store.dispatch(Web3Actions.chainBusy({status:false}))
    }
  }

  ngAfterViewInit(): void {
    this.store.pipe(web3Selectors.selectChainReady).subscribe(async (value) => {

      console.log(' should not be in contract debug')

      this.myContract = this.dappInjectorService.config.contracts['myContract'];
      this.contract_abi = this.myContract.abi;
      this.signer = this.dappInjectorService.config.signer as Signer;
      
      this.contractHeader = {
        name: this.myContract.name,
        address: this.myContract.address,
        abi: this.myContract.abi
      };

      this.onChainStuff();
    });

    this.store
      .select(web3Selectors.isNetworkBusy)
      .subscribe((isBusy: boolean) => {
        console.log(isBusy);
        this.blockchain_is_busy = isBusy;
      });
  }
}
