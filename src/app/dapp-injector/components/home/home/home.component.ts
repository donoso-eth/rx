import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Signer } from 'ethers';
import { NETWORK_STAATUS, Web3State, web3Selectors } from '../../../store';


@Component({
  selector: 'onchain-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  public blockchain_status:NETWORK_STAATUS = 'loading'
  constructor(    private store: Store<Web3State>,) { }
  ngOnChanges(): void {
  }

  @Input() public contractHeader!:any

  @Input() public blockchain_is_busy = false;


  
  @Input() public signer!:Signer;
  @Output() public doFaucetEvent = new EventEmitter();
  @Output() public openTransactionEvent = new EventEmitter();

  ngOnInit(): void {
    this.store.select(web3Selectors.chainStatus).subscribe(async (value) => { this.blockchain_status = value})
  }

  
}
