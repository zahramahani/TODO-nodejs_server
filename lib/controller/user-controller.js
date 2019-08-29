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

/**
 * @api {get} /api/task:todoId Request  tasks information
 * @apiName getTasks
 * @apiGroup task
 *
 * @apiParam {String} todoId todo unique ID.
 *
 * @apiSuccess {String} todoId the id of the todo which task belongs to it.
 * @apiSuccess {Boolean} check true if task is done.
 * @apiSuccess {String}  description the text of the task.
 * @apiSuccess {String}  image_url the image of owner of the task.
 *
 * @apiError (404) {Object} errorGetTasks task not founded. mismatch with todoId.
 *
 */
// const { getUserImage, getUsersImage, getUserName, postUser, postOwner, getOwner } = require('../controller/user-controller')
exports.getUserImage = (request, response) => {
  const errorGetUserImage = {
    type: 'errorGetUserImage',
    explain: 'user not founded.mismatch with userId'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.taskId)
  if (query.taskId) {
    database.getUserImageDb(query.taskId)
      .then((result) => {
        ok(response, result.rows)
      })
      .catch((err) => {
        errorNotFound(response, errorGetUserImage)
        error(response, err)
      })
  }
}
exports.getUsersName = (request, response) => {
  const errorGetUsersImage = {
    type: 'errorGetUsersImage',
    explain: 'user not founded.mismatch with userId'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.boardId)
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (query.boardId) {
      database.getUsersNameDb(query.boardId)
        .then((result) => {
          ok(response, result.rows)
        })
        .catch((err) => {
          errorNotFound(response, errorGetUsersImage)
          error(response, err)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.getUsersImage = (request, response) => {
  const errorGetUserName = {
    type: 'errorGetUserImage',
    explain: 'user not founded.mismatch with userId'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.boardId)
  if (query.boardId) {
    database.getUsersImageDb(query.boardId)
      .then((result) => {
        ok(response, result.rows)
      })
      .catch((err) => {
        errorNotFound(response, errorGetUserName)
        error(response, err)
      })
  }
}

exports.postUser = (request, response) => {
  //   getRawBody(request)
  //     .then((bodyBuffer) => {
  //       const body = JSON.parse(bodyBuffer.toString())

  //       const valid = ajv.validate(schema.userSchema, body)
  //       const validatonError = ajv.errors
  //       // const acceptAddTask = {
  //       //   type: 'acceptAddTask',
  //       //   explain: 'task added successfully '
  //       // }
  //       if (valid) {
  //         database.postUserDb(body)
  //           .then((result) => {
  //             created(response, result.rows)
  //           })
  //           .catch((err) => {
  //             error(response, err)
  //           })
  //       } else {
  //         error(response, validatonError)
  //       }
  //     }).catch((err) => {
  //       error(response, err)
  //     })
}
exports.getOwner = (request, response) => {
  const errorGetOwner = {
    type: 'errorGetUserImage',
    explain: 'user not founded.mismatch with userId'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.taskId)
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (query.taskId) {
      database.getUserImageDb(query.taskId)
        .then((result) => {
          ok(response, result.rows)
        })
        .catch((err) => {
          errorNotFound(response, errorGetOwner)
          error(response, err)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.postOwner = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.userSchema, body)
      const validatonError = ajv.errors
      // const acceptAddTask = {
      //   type: 'acceptAddTask',
      //   explain: 'task added successfully '
      // }
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      const tokenValidation = hasAccess(request)
      if (tokenValidation.verify) {
        if (valid) {
          database.postOwerDb(body)
            .then((result) => {
              created(response, result.rows)
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          error(response, validatonError)
        }
      } else {
        errorNotValid(response, errorNotvalid)
      }
    }).catch((err) => {
      error(response, err)
    })
}
// ssstart
exports.getUserName = (request, response) => {
  const errorGetUserName = {
    type: 'errorGetUserName',
    explain: 'user not found.mismatch with userId'
  }

  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  // console.log('gets')
  // console.log(query.boardId)
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

exports.addUserToBoard = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const temp = body
      temp.userId = Number(body.userId)
      temp.boardId = Number(body.boardId)
      console.log(temp.userId)
      console.log('hello')
      // const valid = ajv.validate(schema.userSchema, body)
      // const validatonError = ajv.errors
      // const acceptAddTask = {
      //   type: 'acceptAddTask',
      //   explain: 'task added successfully '
      // }
      // if (valid) {
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      const tokenValidation = hasAccess(request)
      if (tokenValidation.verify) {
        database.postOwnerDb(temp)
          .then((result) => {
            created(response, result)
          })
          .catch((err) => {
            error(response, err)
          })
        // } else {
        //   error(response, validatonError)
        // }
      } else {
        errorNotValid(response, errorNotvalid)
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
  // console.log('gets')
  // console.log(query.boardId)
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
  // debugger
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.boardId)
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (query.boardId) {
      // const temp = query
      //  debugger
      // temp.boardId = Number(query.boardId)
      database.getUserDb(query.boardId)
        .then((result) => {
          ok(response, result)
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
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.userName)
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
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
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.signUp = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userSignupSchema, body)
      const validatonError = ajv.errors
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
              ok(response, result)
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
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userloginSchema, body)
      const validatonError = ajv.errors
      if (valid) {
        database.getAuthUser(body.userName)
          .then((result) => {
            const user = result.rows[0]
            if (verifyPassword(body.password, user.salt, user.passwordHash)) {
              console.log('checked')
              const token = signToken({ userName: body.userName })
              ok(response, {
                token: token,
                status: 'OK'
              })
            } else {
              error(response, errorLogin)
            }
          })
          .catch((error) => {
            error(response, error.stack)
          })
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err.stack)
    })
}
