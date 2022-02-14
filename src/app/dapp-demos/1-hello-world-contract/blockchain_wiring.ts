
import { InjectionToken } from '@angular/core';
import HelloWorldContractMetadata from '../../../assets/contracts/hello_world_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule, HomeModule, IABI_OBJECT } from 'angular-web3';
import {ICONTRACT } from 'angular-web3';
import { Contract, Signer } from 'ethers';




export const contractMetadata = new InjectionToken<ICONTRACT>('contractMetadata')

export const blockchain_providers = [ {provide:'contractMetadata', useValue:HelloWorldContractMetadata}]

export const blockchain_imports = [HomeModule,ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
