const Ajv = require('ajv')
const getRawBody = require('raw-body')
const URL = require('URL')
const database = require('../db/database')
const {
  ok,
  created,
  error,
  errorNotFound
} = require('../util/response')
const schema = require('../schema/board-schema')

const ajv = new Ajv({
  allErrors: true
})
exports.removeOwner = (request, response, params) => {
  const temp = params
  temp.boardId = Number(params.boardId)
  const valid = ajv.validate(schema.boardIdSchema, temp)
  const validatonError = ajv.errors

  const errorRemoveBoardUser = {
    type: 'errorRemoveBoardUser',
    explain: 'user not founded. remove failed'
  }
  if (valid) {
    database.removeOwnerDb(temp.boardId)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        errorNotFound(response, errorRemoveBoardUser)
        error(response, err)
      })
  } else {
    error(response, validatonError)
  }
}
exports.getBoardHasUser = (request, response) => {
  const errorGetBoardHasUser = {
    type: 'errorGetBoardHasUser',
    explain: 'is repeated'
  }
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.userId)
  if (query.userName) {
    database.getBoardHasUserDb(query.userId)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        errorNotFound(response, errorGetBoardHasUser)
        error(response, err)
      })
  }
}
