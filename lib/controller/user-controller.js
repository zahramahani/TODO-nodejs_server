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
const schema = require('../schema/user-schema')

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
    }).catch((err) => {
      error(response, err)
    })
}

exports.getUserName = (request, response) => {
  const errorGetUserName = {
    type: 'errorGetUserName',
    explain: 'user not found.mismatch with userId'
  }

  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  // console.log('gets')
  // console.log(query.boardId)
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
}
