import { Action, createAction } from "@ngrx/store";





export enum Web3ActionTypes {
    LoadChain = '[Chain] Load',
    LoadedChain = '[Chain] Loaded',

    ChainBusy = '[Chain] Busy',

    WebModalShow = '[WebModal] Show',
    WebModalDisconnect = '[WebModal] Disconnect',

    BlockUpdated = '[Block] Updated',
  }
  

 const loadChain = createAction('[Chain] Load');
 const chainLoaded = createAction( '[Chain] Loaded');


  export const Web3Actions  = {
    loadChain,
    chainLoaded
  }


// export class LoadChain implements Action {
//     readonly type = Web3ActionTypes.LoadChain
//   }
  

  
 // export type SpinnerActions = LoadChain