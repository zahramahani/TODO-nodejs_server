const Ajv = require('ajv')
const URL = require('url')
const database = require('../db/database')
const {
  ok,
  errorNotFound,
  error,
  errorNotValid
} = require('../util/response')
const schema = require('../schema/board-schema')
const { hasAccess } = require('../auth/auth')

const ajv = new Ajv({
  allErrors: true
})
/**
 * @api {delete} /api/owner/:boardId deletespecialboardsowner
 * @apiName removeOwner
 * @apiGroup boards-users
 *
 * @apiParam {String} boardId boards unique ID.
 *
 * @apiSuccess (200) {Object} acceptRemoveBoardUser  board removed.
 *
 * @apiError (404) {Object} errorRemoveBoard user not founded. remove failed.
 * @apiError (400) {Object} errorNotvalid validatonError.
 */

exports.removeOwner = (request, response, params) => {
  const temp = params
  temp.boardId = Number(params.boardId)
  const valid = ajv.validate(schema.boardIdSchema, temp)
  const validatonError = ajv.errors

  const errorRemoveBoardUser = {
    type: 'errorRemoveBoardUser',
    explain: 'user not founded. remove failed'
  }
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
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
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.getBoardHasUser = (request, response) => {
  const errorGetBoardHasUser = {
    type: 'errorGetBoardHasUser',
    explain: 'is repeated'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
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
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
