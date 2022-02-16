import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WalletDisplayModule } from '../wallet-display/wallet-display.module';
import { Web3ModalModule } from '../web3-modal';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WalletDisplayModule,
    Web3ModalModule
  ],
  exports: [
    HomeComponent,


  ]
})
export class HomeModule { }
