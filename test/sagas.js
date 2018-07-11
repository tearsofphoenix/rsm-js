import { all } from 'redux-saga/effects'
import {sagaLoader} from '../'
import testModule from './module'

export default function* rootSaga(getState) {
  yield all([sagaLoader(testModule)])
}
