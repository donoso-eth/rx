import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { we3ReducerFunction } from './dapp-injector/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { HelloWorldContractModule } from './dapp-demos/1-hello-world-contract/hello-world-contract.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DappInjectorModule } from './dapp-injector/dapp-injector.module';

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
    BrowserAnimationsModule,
    DappInjectorModule
  ],
  providers:  [],
  bootstrap: [AppComponent]
})
export class AppModule { }
