import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import testModule from './module'
import {reduxLoader} from '../'

const obj = {
  routing: routerReducer
}

reduxLoader(testModule, obj)

const reducers = combineReducers(obj);

export default reducers;
