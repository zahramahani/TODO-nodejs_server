const http = require('http')
const router = require('./lib/router/router').router

const server = http.createServer()

server.on('request', function (request, response) {
  router.lookup(request, response)
})

server.listen(3001, function () {
  console.log(`server is running on port 3001`)
})
