import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { we3ReducerFunction } from './dapp-injector/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { HelloWorldContractModule } from './dapp-demos/1-hello-world-contract/hello-world-contract.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugContractModule } from './dapp-demos/2-debug-contract/debug-contract.module';
import { OnChainService } from './dapp-demos/1-hello-world-contract/on-chain.service';
import { WalletdisplaytModule } from 'angular-web3';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({web3: we3ReducerFunction}),
    EffectsModule.forRoot([]),
    HelloWorldContractModule,
    BrowserAnimationsModule
  ],
  providers: [OnChainService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
