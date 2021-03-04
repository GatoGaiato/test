const combinations = ['012', '345', '678', '036', '147', '258', '048', '246'];

function logics(a) {
  const aaa = a.split('')
  let u = 0;
  for(x of a){ this.seq[x] === this.val ? ++u : --u }
  console.log(u)
  return u === 3
}

// essa será exportada 
exports.verify = (seq, val) => {
  console.log('Iniciando teste...');
  const obj = { seq, val };
  const result = combinations.some(logics, obj);
  return result;
}

// aqui é só um teste, como se fosse outro script chamando
// console.log(verify(['X','O','O','O','X','O','O','O','X'],'X'));