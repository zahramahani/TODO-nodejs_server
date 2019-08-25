const Ajv = require('ajv')
const database = require('../db/database')
const {
  ok,
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
