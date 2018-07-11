
// reducer函数的包装
function reducerCreator(m, target) {
  return (state, action) => {
    // 初始化state时，返回module的初始state
    if (typeof state === 'undefined') {
      // init state
      return m.state
    }
    // 如果是相对路径的type，则将其转化为绝对路径
    const {type} = action
    let func = null
    if (type.indexOf('/') === -1) {
      func = m.reducers[type]
    } else {
      let parts = type.split('/')
      if (parts.length > 1) {
        func = target[parts[0]]
        if (func) {
          return func(state, {...action, type: parts[1]})
        }
      }
    }
    // 依据action的type去匹配reducer函数，等价于switch-case代码段
    if (func) return func(state, action)
    return state
  }
}

export default function(m, target) {
  // 将reducer部分载入redux中
  /* eslint-disable-next-line no-param-reassign */
  target[m.name] = reducerCreator(m, target)
}
