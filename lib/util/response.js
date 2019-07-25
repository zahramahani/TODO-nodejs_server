exports.ok = (response, data) => {
    console.log("ok")
    response.statusCode = 200
    body = { status:response.statusCode }
    responseBody = { ...body, ...data }
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(responseBody))
    response.end()
  }
  exports.created = (response, data) => {
    console.log("ok")
    response.statusCode = 201
    body = { status:response.statusCode }
    responseBody = { ...body, ...data }
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(responseBody))
    response.end()
  }
  
  exports.error = (response, data) => {
    response.statusCode = 400
    body = { status:response.statusCode }
    responseBody = { ...body, ...data }
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(responseBody))
    response.end()
  }
  exports.errorNotFound = (response, data) => {
    response.statusCode = 404
    body = { status:response.statusCode }
    responseBody = { ...body, ...data }
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(responseBody))
    response.end()
  }
  