import { Component, Inject, OnInit } from '@angular/core';

import { OnChainService } from '../on-chain.service';


// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad';


@Component({
  selector: 'simple-nft-contract',
  templateUrl: './simple-nft-example.component.html',
  styleUrls: ['./simple-nft-example.component.css'],
})
export class SimpleNftExampleComponent implements OnInit {
  deployer_address!: string;
  myWallet: any;
  myContract: any;
  contractHeader!: { name: string; address: string };
  blockchain_is_busy = false;
  constructor(private onChainService: OnChainService) {

  }


  async onChainStuff() {
    await this.onChainService.init();

    this.deployer_address =
      await this.onChainService.myProvider.Signer.getAddress();

    this.myWallet = await this.onChainService.newWallet.wallet;
    this.myContract = this.onChainService.simpleNftContract.Contract;

    this.contractHeader = {
      name: this.onChainService.simpleNftContract.metadata.name,
      address: this.onChainService.simpleNftContract.metadata.address,
    };
  }

  ngOnInit(): void {
    this.onChainStuff();
  }
}
