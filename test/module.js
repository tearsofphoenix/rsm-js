import {asyncFunc} from './api'

export default {
  name: 'demo',
  state: {
    current: 10,
    result: null
  },
  effects: {
    * log(action, ctx) {
      console.log(action, ctx)
      const {put, call} = ctx
      const result = yield call(asyncFunc, action.payload)
      yield put({
        type: 'saveResult',
        payload: result
      })
    }
  },
  reducers: {
    saveResult(state, action) {
      return {
        ...state,
        result: action.payload
      }
    }
  }
}
