import * as saga from 'redux-saga/effects'
const { all, takeEvery, fork } = saga

// 包装effect函数
function effectWrapper(func) {
  return function* (args) {
    return yield func(args, saga)
  }
}

// 包装action函数
function actionCreator(action, func) {
  return function* () {
    yield takeEvery(action, effectWrapper(func))
  }
}

// 包装saga
function sagaCreator(effects) {
  return function* () {
    yield all(effects)
  }
}

// 将module内的effects函数载入saga
export default function(m) {
  const {name, effects = {}} = m
  const result = []
  // 遍历各effects函数
  Object.keys(effects).forEach(key => {
    const value = effects[key]
    // 使用`name`拼接函数名的方式来作为saga内的key
    const action = `${name}/${key}`
    result.push(fork(actionCreator(action, value)))
  })
  // 执行该saga
  return sagaCreator(result)()
}
