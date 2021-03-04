let _container = null;
const _placeholder = new Array(9);

const _screen = {} // implementar algo aqui futuramente
const _game = {
  _mode: null,
  get mode(){ return this._mode},
  _players: [], // P1 e P2 {name:null, symbol:null}
  _rules: {
    _mode:{
      0: 'GameOver',
      1: 'SinglePlayer',
      2: 'MultiPlayer',
      4: 'Win'
    } // ,symbols:['X','O'] fazer o Init() armazenar os simbolos e usar daqui
  },
  _turn: new Array(2),
  _play: [undefined,0],
  _isOver: false
}
function _getNextPlay(){
  return this._play[0]
}
const _Logics = {
  _combinations: ['012', '345', '678', '036', '147', '258', '048', '246'],
    verify: function (_seq, _val){
    const _obj = {_seq, _val}
    const _result = _Logics._combinations.some(_Logics._calc, _obj)
    return _result
  },
  _calc: function (_val){
    let _t = 0; const _v = _val.split('')
    for(_x of _v){ this._seq[_x] === this._val[1] ? ++_t : --_t }
    return _t === 3
  }
}
const Init = (htmlContainer, rules)=>{
  const _gR = _game._rules, _pLgh = rules.players.length
  _container = htmlContainer; // define o container
  _game._mode = _gR._mode[rules.mode] || _gR._mode[0] // verifica se o modo de jogo existe
  for(_x = 0; _x < _pLgh; ++_x){ // adiciona os jogadores à partida
    _game._players.push({
      name: rules.players[_x].name,
      symbol: rules.players[_x].symbol
    })
  }
  const _nextPlayer = setTurn([_game._players[0].name,_game._players[0].symbol]) // pega os dados do primeiro jogador
  htmlContainer.insertAdjacentHTML('afterend','<br><span id="resetBTN" onClick="">NOVO JOGO</span>')
  Draw(null,_game._turn,_game._mode)
  _game._isOver = false;
}

function setTurn(player){
  let _P = player || [
    _game._turn[0] == _game._players[0].name ? _game._players[1].name:_game._players[0].name,
    _game._turn[1] == _game._players[0].symbol ? _game._players[1].symbol:_game._players[0].symbol
  ]
  for(_x = 0; _x < _game._turn.length; ++_x){
    _game._turn[_x] = _P[_x]
  }
  _game._play[0] = _P[0]
  return _P
}
function Play(e){
  if(isOver) return false // aqui verifico se o jogo acabou.
  const _turn = _game._turn; // aqui eu verifico de quem é a vez.
  let ref = e.target, n = 0, xref = ref;
  while((xref = xref.previousSibling) != null) ++n; // aqui verifico qual o quadrado foi preenchido.
  if(ref.innerHTML === ''){
    _placeholder[n] = _turn[1]; // aqui adiciono o valor do tabuleiro para a array de verificação
    if(_game._play[1] > 3){ // aqui só começo a verificar a partir da 5° jogada
      if(_Logics.verify(_placeholder,_turn)){ //aqui eu chamo a lógica de verificação
        // Draw(ref,_turn);
        Draw(ref,_game._turn,_game._rules._mode[4])
        console.log('voce venceu!')
        isOver = true;
        return false
      }
    }
    Draw(ref,_turn);
    // setTurn();

  } else return false
  ++_game._play[1] // aqui finalizo a jogada
}
function Draw(target, v, mode){
  const _info = document.getElementById('info')
  switch (mode) {
    case 'Win':
      target.innerHTML = v[1]; // aqui desenho o simbolo no tabuleiro.
      _info.innerHTML = `${v[0]} venceu!`
      break;
    case 'SinglePlayer': // 0: a new game
      const node = `<div onClick='Play(event)'>${''}</div>`
      for (i of _placeholder) {
        _container.innerHTML += node;
      }
      _info.innerHTML = `Novo jogo. ${v[0]} Começa!`
      break;
    case 'MultiPlayer':
      break;
    default:
      target.innerHTML = v[1]; // aqui desenho o simbolo no tabuleiro.
      _info.innerHTML = `É a vez de ${setTurn()[0]}`// `É a vez de ${v[0]==_game._players[0].name?_game._players[1].name:_game._players[0].name}`
      break;
  }
}