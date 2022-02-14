import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Signer } from 'ethers';

@Component({
  selector: 'onchain-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(): void {
  }

  @Input() public contractName!:string

  @Input() public blockchain_is_busy = false;
  
  @Input() public signer!:Signer;
  @Output() public doFaucetEvent = new EventEmitter();
  @Output() public openTransactionEvent = new EventEmitter();

  ngOnInit(): void {
  }

  
}
