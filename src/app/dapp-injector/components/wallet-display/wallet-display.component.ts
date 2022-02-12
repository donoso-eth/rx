import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { createIcon } from '@download/blockies';
import { Store } from '@ngrx/store';
import { AngularWallet, convertWeiToEther ,  displayEther,
  displayUsd,
  web3Selectors,
  Web3State} from 'angular-web3';
import { OnChainService } from 'src/app/dapp-demos/1-hello-world-contract/on-chain.service';




@Component({
  selector: 'wallet-display',
  templateUrl: './wallet-display.component.html',
  styleUrls: ['./wallet-display.component.css']
})
export class WalletDisplayComponent implements AfterViewInit {
  blockiesOptions:any;
  address_to_show!:string;
  balance!: { ether: any; usd: any; };
  myWallet: any;

  constructor(private renderer:Renderer2, private onChainService:OnChainService,   private store: Store<Web3State>) {

   }

   async convertWeitoDisplay(balance:number) {
    const ehterbalance = convertWeiToEther(balance);
    const dollar =
      ehterbalance * (await this.onChainService.getDollarEther());
    this.balance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
   }  

  ngOnChanges(changes: SimpleChanges): void {

  }

  @ViewChild("wallet", {read: ElementRef}) private walletDiv!: ElementRef;


  doFaucet(){

  }

  ngAfterViewInit(): void {

    this.store.pipe(web3Selectors.selectChainReady).subscribe(async (value) => {
      console.log(value);
      this.myWallet= this.onChainService.config.signer;
      this.address_to_show = await this.myWallet.getAddress()
      const balance = await this.myWallet.getBalance();

      this.blockiesOptions = { // All options are optional
        seed: this.address_to_show, // seed used to generate icon data, default: random
        color: '#dfe', // to manually specify the icon color, default: random
        bgcolor: '#aaa', // choose a different background color, default: random
        size: 8, // width/height of the icon in blocks, default: 8
        scale: 3, // width/height of each block in pixels, default: 4
        spotcolor: '#000' // each pixel has a 13% chance of being of a third color,
        // default: random. Set to -1 to disable it. These "spots" create structures
        // that look like eyes, mouths and noses.
      }
     // await this.myWallet.refreshWalletBalance()
    });

     //  this.address_to_show =  await this.myWallet._myWallet.getAddress()


    const icon = createIcon(this.blockiesOptions);
    
    this.renderer.appendChild(this.walletDiv.nativeElement,icon);
    }
  





}
