import { JsonRpcProvider } from '@ethersproject/providers';
import { Action, createAction, props } from '@ngrx/store';
import { Contract, providers, Signer, Wallet } from 'ethers';

export enum Web3ActionTypes {
  ChainLaod = '[Chain] Load',
  ChainBusy = '[Chain] Busy',
  SetDollarExhange = '[Set] Dollar'

}
const chainMount = createAction('[Chain] Mount')();
const chainReady = createAction('[Chain] Ready')();

const chainLoad = createAction('[Chain] Load', props<{status:boolean}>());
const chainBusy = createAction('[Chain] Busy', props<{status:boolean}>());

const setDollarExhange = createAction('[Set] Dollar', props<{exchange:number}>());


export const Web3Actions = {
  chainMount,
  chainReady,
  chainLoad,
  chainBusy,

  setDollarExhange

};

