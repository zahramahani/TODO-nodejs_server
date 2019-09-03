require('dotenv').config()
const server = require('./lib/server').server
const PORT = process.env.PORT || 80
server.listen(PORT, function () {
  console.log(`server is running on port 6000`)
})
