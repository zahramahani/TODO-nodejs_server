const Ajv = require('ajv')
const getRawBody = require('raw-body')
const URL = require('url')
const database = require('../db/database')
const {
  ok,
  created,
  error,
  errorNotFound,
  errorNotValid
} = require('../util/response')
const {
  passwordPolicy,
  createHash,
  verifyPassword,
  signToken
} = require('../auth/auth')

const schema = require('../schema/user-schema')
const { hasAccess } = require('../auth/auth')

const ajv = new Ajv({
  allErrors: true
})
exports.getUserName = (request, response) => {
  const errorGetUserName = {
    type: 'errorGetUserName',
    explain: 'user not found.mismatch with userId'
  }

  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (query.userId) {
      database.getUserNameDb(query.userId)
        .then((result) => {
          ok(response, result)
        })
        .catch((err) => {
          errorNotFound(response, errorGetUserName)
          error(response, err)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.deleteUserFromBoard = (request, response, params) => {
  const temp = params
  temp.userId = Number(params.userId)
  temp.boardId = Number(params.boardId)
  const errorRemoveUser = {
    type: 'errorRemoveUser',
    explain: 'user not founded. remove failed'
  }
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    database.deleteUserDb(temp)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        errorNotFound(response, errorRemoveUser)
        error(response, err)
      })
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.addUserToBoard = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userSchema, body)
      const temp = body
      temp.userId = Number(body.userId)
      temp.boardId = Number(body.boardId)
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      const validatonError = {
        message: 'Validation Error'
      }
      if (valid) {
        const tokenValidation = hasAccess(request)
        if (tokenValidation.verify) {
          database.postOwnerDb(temp)
            .then((result) => {
              created(response, { message: 'created' })
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          errorNotValid(response, errorNotvalid)
        }
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err)
    })
}
exports.getuserIdByUserName = (request, response) => {
  const errorGetUserName = {
    type: 'errorGetUserId.mismatch with userName'
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
      database.getUserIdDb(query.userName)
        .then((result) => {
          ok(response, result)
        })
        .catch((err) => {
          errorNotFound(response, errorGetUserName)
          error(response, err)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.getUser = (request, response) => {
  const errorGetUser = {
    type: 'errorGetUser.mismatch with boardId'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (query.boardId) {
      database.getUserDb(query.boardId)
        .then((result) => {
          ok(response, { message: 'getUser successfully' })
        })
        .catch((err) => {
          errorNotFound(response, errorGetUser)
          error(response, err)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.getUserRepeted = (request, response) => {
  const errorGetUserRepeated = {
    type: 'errorGetUserRepeated',
    explain: 'mismatch with userId'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  if (query.userName) {
    database.getUserRepeatedDb(query.userName)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        errorNotFound(response, errorGetUserRepeated)
        error(response, err)
      })
  }
}
exports.signUp = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userSignupSchema, body)
      // const validatonError = ajv.errors
      const validatonError = {
        type: 'validatonError'
      }
      if (valid) {
        // 1. check password is valid
        const passwordChecked = passwordPolicy.check(body.password)
        if (passwordChecked) {
          const firstName = body.firstName
          const lastName = body.lastName
          const userName = body.userName
          const password = body.password
          const {
            salt,
            passwordHash
          } = createHash(password)
          const user = {
            firstName,
            lastName,
            salt,
            userName,
            passwordHash
          }
          database.addAuthUser(user)
            .then((result) => {
              ok(response, { message: 'signup successfully' })
            })
            .catch((err) => {
              error(response, err.stack)
            })
        } else {
          error(response, passwordPolicy.missing(body.password))
        }
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err.stack)
    })
}
exports.login = (request, response, params) => {
  const errorLogin = {
    type: 'errorLogin',
    explain: 'userName and password mismatch'
  }
  const userameErrorLogin = {
    type: 'userameErrorLogin',
    explain: 'userName mismatch'
  }
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userloginSchema, body)
      const validatonError = {
        type: 'validatonError',
        explain: 'Validation Error'
      }
      if (valid) {
        database.getAuthUser(body.userName)
          .then((result) => {
            const user = result.rows[0]
            if (user !== undefined) {
              if (verifyPassword(body.password, user.salt, user.passwordHash)) {
                const token = signToken({ userName: body.userName })
                ok(response, {
                  token: token,
                  status: 'OK'
                })
              } else {
                error(response, errorLogin)
              }
            } else {
              error(response, userameErrorLogin)
            }
          })
          .catch((err) => {
            error(response, err.stack)
          })
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, userameErrorLogin)
      error(response, err.stack)
    })
}
