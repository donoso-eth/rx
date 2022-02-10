
import { InjectionToken } from '@angular/core';
import HelloWorldContractMetadata from '../../../assets/contracts/hello_world_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule, HomeModule } from 'angular-web3';
import {ICONTRACT } from 'angular-web3';

export interface ISTARTUP_CONFIG {
    defaultNetwork: string,
    wallet: 'metamask' | 'privKey' | 'burner',
    blockSubscription:boolean,

}


export const startUpConfig:ISTARTUP_CONFIG = {
    defaultNetwork: 'localhost',
    wallet: 'metamask',
    blockSubscription: false,


}


export const helloWorldContractMetadata = new InjectionToken<ICONTRACT>('helloWorldContractMetadata')

export const blockchain_providers = [ {provide:'helloWorldContractMetadata', useValue:HelloWorldContractMetadata}]

export const blockchain_imports = [HomeModule,ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
