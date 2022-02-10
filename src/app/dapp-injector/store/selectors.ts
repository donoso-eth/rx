import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { pipe, filter } from "rxjs";
import { Web3State } from "./models";
import * as reducer from './reducer'

export const selectState = (state: Web3State) => state;


export const selectWeb3State = createFeatureSelector<Web3State>(
    reducer.web3FeatureKey
);


 const isInitializing = createSelector(
    selectWeb3State,
     (state: Web3State) => state.initializing
  );

  export const selectChainReady = pipe(
    select(isInitializing),
    filter(val => val == false)
   );
   
  
export const getContractByKey = (key:string) => 
    createSelector(
    selectWeb3State,
     (state: Web3State) =>  state.contract[key]
  );




  export const web3Selectors = { 
      isInitializing,
      selectChainReady, 
      getcontractSelector};