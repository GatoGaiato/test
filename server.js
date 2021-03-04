require('dotenv').config()

const HTTP = require('http')
// const CRYPTO = require('crypto')
const {Console} = require('console')

const HOST = process.env.HOST
const PORT = process.env.PORT

const SERVER = HTTP.createServer((req,res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello Wolrd!')
})

SERVER.listen(PORT,HOST,()=>{
  console.log(`Por enquanto tá tudo tranquilo em:\nhttp://${HOST}:${PORT}/\n:)`)
  console.info(process.env.NODE_PATH)
})