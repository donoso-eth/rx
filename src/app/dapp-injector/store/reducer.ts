import {
  Action,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import * as web3Actions from './actions';
import { Web3State } from './models';



export const initialState: Web3State = {
  initializing:true,
  isNetworkBusy:true
};


export const web3FeatureKey = 'web3';

const web3dReducer = createReducer(
  initialState,
  on(web3Actions.Web3Actions.chainLoad, (state,{status}) => ({ ...state, initializing:status})),
  on(web3Actions.Web3Actions.chainBusy, (state,{status}) => ({ ...state, isNetworkBusy:status})),

);
export function we3ReducerFunction(state: Web3State | undefined, action: Action) {
  return web3dReducer(state, action);
}


