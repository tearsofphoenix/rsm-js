
export function asyncFunc(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('timeout', payload)
      resolve(Math.log(payload))
    }, 300)
  })
}
