import { JsonRpcProvider } from '@ethersproject/providers';
import { Action, createAction, props } from '@ngrx/store';
import { Contract, providers, Signer, Wallet } from 'ethers';

export enum Web3ActionTypes {
  ChainStatus = '[Chain] Status',
  ChainBusy = '[Chain] Busy',
  setSignerNetwork = '[Set] SignerNetwork',
  SetDollarExhange = '[Set] Dollar',
  UpdateWalletBalance = '[Update] WalletBalance'

}
// const chainMount = createAction('[Chain] Mount')();
// const chainReady = createAction('[Chain] Ready')();

const chainStatus = createAction('[Chain] Status', props<{status:'loading' | 'fail' | 'success'}>());
const chainBusy = createAction('[Chain] Busy', props<{status:boolean}>());
const setSignerNetwork = createAction( '[Set] SignerNetwork', props<{network:string}>());

const setDollarExhange = createAction('[Set] Dollar', props<{exchange:number}>());

const updateWalletBalance = createAction('[Update] WalletBalance', props<{walletBalance:number}>());

export const Web3Actions = {

  chainStatus,
  chainBusy,

  setSignerNetwork,

  setDollarExhange,
  updateWalletBalance

};

