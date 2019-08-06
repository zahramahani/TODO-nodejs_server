exports.ok = (response, data) => {
  console.log('ok')
  response.statusCode = 200
  const body = { status: response.statusCode }
  const responseBody = { ...body, ...data }
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}
exports.created = (response, data) => {
  console.log('ok')
  response.statusCode = 201
  // const body = { status: response.statusCode }
  // const responseBody = { ...body, ...data }
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.error = (response, data) => {
  response.statusCode = 400
  const body = { status: response.statusCode }
  const responseBody = { ...body, ...data }
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}
exports.errorNotFound = (response, data) => {
  response.statusCode = 404
  const body = { status: response.statusCode }
  const responseBody = { ...body, ...data }
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}
