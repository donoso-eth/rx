import { Component } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { map } from 'rxjs';
import {   Web3Actions, web3Selectors, Web3State } from './dapp-injector/store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rx';
  /**
   *
   */
  constructor(private store:Store<Web3State>) {

    this.store.dispatch(Web3Actions.chainStatus({status:'loading'}))

    // this.store.pipe(select(web3Selectors.isNetworkBusy)).subscribe((x:any)=> this.b)
 
   
  }
  
}
