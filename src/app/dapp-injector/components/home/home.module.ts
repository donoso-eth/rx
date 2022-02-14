import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WalletDisplayModule } from '../wallet-display/wallet-display.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WalletDisplayModule
  ],
  exports: [
    HomeComponent,

  ]
})
export class HomeModule { }
