import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Web3State } from "./models";
import * as reducer from './reducer'

export const selectState = (state: Web3State) => state;


export const selectWeb3State = createFeatureSelector<Web3State>(
    reducer.web3FeatureKey
);


 const isInitializing = createSelector(
    selectWeb3State,
     (state: Web3State) => state
  );

  export const web3Selectors = { isInitializing};