import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe, filter } from 'rxjs';
import { Web3State } from './models';
import * as reducer from './reducer';

export const selectState = (state: Web3State) => state;

export const selectWeb3State = createFeatureSelector<Web3State>(
  reducer.web3FeatureKey
);

const isInitializing = createSelector(
  selectWeb3State,
  (state: Web3State) => state.initializing
);

const selectChainReady = pipe(
  select(isInitializing),
  filter((val) => val == false)
);

const isNetworkBusy = createSelector(
  selectWeb3State,
  (state: Web3State) => state.isNetworkBusy
);

export const web3Selectors = {
  isInitializing,
  selectChainReady,
  isNetworkBusy,
};
