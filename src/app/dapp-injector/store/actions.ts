import { JsonRpcProvider } from '@ethersproject/providers';
import { Action, createAction, props } from '@ngrx/store';
import { Contract, providers, Signer, Wallet } from 'ethers';

export enum Web3ActionTypes {
  LoadChain = '[Chain] Load',
  LoadedChain = '[Chain] Loaded',

  ChainBusy = '[Chain] Busy',

  WebModalShow = '[WebModal] Show',
  WebModalDisconnect = '[WebModal] Disconnect',

  BlockUpdated = '[Block] Updated',

  SetProvider = '[Provider] Set',

  SetSigner = '[signer] Set',
}

const loadChain = createAction('[Chain] Load');
const chainLoaded = createAction('[Chain] Loaded');

const providerSet = createAction(
  '[Provider] Set',
  props<{ provider: JsonRpcProvider }>()
);

const signerSet = createAction(
  '[Wallet] Set',
  props<{ signer: Signer | providers.JsonRpcSigner }>()
);

const contractSet = createAction(
  '[Contract] Set',
  props<{ contract: Contract }>()
);

export const Web3Actions = {
  loadChain,
  chainLoaded,
  providerSet,
  signerSet,
  contractSet
};

// export class LoadChain implements Action {
//     readonly type = Web3ActionTypes.LoadChain
//   }

// export type SpinnerActions = LoadChain
