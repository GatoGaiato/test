let done = false
let data = '';

const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built'
    resolve(workDone)
  } else {
    const why = 'Still working on something else'
    reject(why)
  }
}).then(ok => {
      data = ok
      console.log(ok,data,'data aqui')
    })
    .catch(err => {
      data = 'err'
      console.error(err, data, 'data aqui')
    })
// const checkIfItsDone = () => {}
setTimeout(() => {console.log(`value: ${data} is the data from promisse`)},0.0000000000000000000001)
// checkIfItsDone()