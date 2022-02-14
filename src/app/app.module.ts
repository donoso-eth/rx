import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { HelloWorldContractModule } from './dapp-demos/1-hello-world-contract/hello-world-contract.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DappInjectorModule,  we3ReducerFunction } from 'angular-web3';
import { DebugContractModule } from './dapp-demos/2-debug-contract/debug-contract.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({web3: we3ReducerFunction}),
    EffectsModule.forRoot([]),
    DebugContractModule,
    BrowserAnimationsModule,
    DappInjectorModule
  ],
  providers:  [],
  bootstrap: [AppComponent]
})
export class AppModule { }
