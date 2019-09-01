const Ajv = require('ajv')
const getRawBody = require('raw-body')
const database = require('../db/database')
const { hasAccess } = require('../auth/auth')
const {
  ok,
  created,
  error,
  errorNotFound,
  errorNotValid
} = require('../util/response')
const schema = require('../schema/board-schema')

const ajv = new Ajv({
  allErrors: true
})

/**
 * @api {get} /api/board Request board information
 * @apiName getBoards
 * @apiGroup board
 *
 * @apiSuccess {String}  board_name  the name of the board.
 * @apiSuccess {Boolean}  complete  check if board compeleted.
 * @apiSuccess {String}  owner  owner of the board.
 * @apiSuccess {String[]}  members  members name of the board.
 * @apiSuccess {String[]}  images  members image of the board.
 * @apiSuccess {Object[]}  todos  todos list of the board.
 */
exports.getBoards = (request, response) => {
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    const userName = tokenValidation.payload.userName

    database.getBoards(userName) /// changed
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    errorNotValid(response, errorNotvalid)
  }
}

/**
 * @api {get} /api/board:boardId Request  special board information
 * @apiName getBoardById
 * @apiGroup board
 * @apiParam {String} boardId boards unique ID.
 * @apiSuccess {String}  board_name  the name of the board.
 * @apiSuccess {Boolean}  complete  check if board compeleted.
 * @apiSuccess {String}  owner  owner of the board.
 * @apiSuccess {String[]}  members  members name of the board.
 * @apiSuccess {String[]}  images  members image of the board.
 * @apiSuccess {Object[]}  todos  todos list of the board.
 *
 * @apiError (404) {Object} errorGetBoardById not founded.mismatch with existance boards.
 * @apiError (400) {Object} validatonError validatonError .
 */
exports.getBoardById = (request, response, params) => {
  const temp = params
  temp.boardId = Number(params.boardId)
  const valid = ajv.validate(schema.boardIdSchema, temp)
  const validatonError = ajv.errors
  const errorGetBoardById = {
    type: 'errorGetBoardById',
    explain: 'board not founded.mismatch with existance boards'
  }
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (valid) {
      // debugger
      database.getBoardById(temp.boardId)
        .then((result) => {
          console.log(result)
          ok(response, result)
        })
        .catch((err) => {
          error(response, err)
          errorNotFound(response, errorGetBoardById)
        })

      // if (board) {
      //   ok(response, board)
      // } else {
      //   errorNotFound(response, errorGetBoardById)
      // }
    } else {
      error(response, validatonError)
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
/**
 * @api {post} /api/board create new board.
 * @apiName addBoard
 * @apiGroup board
 *
 * @apiParam {String}  board_name  the name of the board.
 * @apiParam {Boolean}  complete  check if board compeleted.
 * @apiParam {String}  owner  owner of the board.
 * @apiParam {String[]}  members  members name of the board.
 * @apiParam {String[]}  images  members image of the board.
 * @apiParam {Object[]}  todos  todos list of the board.
 *
 *
 * @apiSuccess (201) {Object}  acceptAddBoard  "board added successfully ".
 *
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.addBoard = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      // debugger
      const valid = ajv.validate(schema.boardSchema, body)
      const tokenValidation = hasAccess(request)
      const validatonError = ajv.errors
      const userName = tokenValidation.payload.userName
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      if (tokenValidation.verify) {
        if (valid) {
          database.getUserIdDb(userName).then(data => {
            console.log(data)
            console.log('data')
            console.log('hello')
            // const valid = ajv.validate(schema.userSchema, body)
            // const validatonError = ajv.errors
            // const acceptAddTask = {
            //   type: 'acceptAddTask',
            //   explain: 'task added successfully '
            // }
            // if (valid) {
            body.ownerId = data
            // body.ownerId = userName
            database.addBoard(body)
              .then((result) => {
                database.postOwnerDb({ userId: data, boardId: result.rows[0].boardId })
                  .then((data) => {
                    created(response, data)
                  })
              })
              .catch((err) => {
                error(response, err)
              })
          }).catch((err) => {
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
/**
 * @api {put} /api/board:boardId update existing board
 * @apiName updateBoard
 * @apiGroup board
 *
 * @apiParam {String} boardId boards unique ID.
 *
 * @apiParam {String}  board_name  the name of the board.
 * @apiParam {Boolean}  complete  check if board compeleted.
 * @apiParam {String}  owner  owner of the board.
 * @apiParam {String[]}  members  members name of the board.
 * @apiParam {String[]}  images  members image of the board.
 * @apiParam {Object[]}  todos  todos list of the board.
 * @apiSuccess (200) {Object} acceptUpdateBoard  board updated.
 *
 * @apiError (404) {Object} errorUpdateBoard board not founded. update failed.
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.updateBoard = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.boardSchema, body)
      const validatonError = ajv.errors
      // const acceptUpdateBoard = {
      //   type: 'acceptUpdateBoard',
      //   explain: 'board updated'
      // }
      const errorUpdateBoard = {
        type: 'errorUpdateBoard',
        explain: 'board not founded. update failed'
      }
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      const tokenValidation = hasAccess(request)
      if (tokenValidation.verify) {
        if (valid) {
          database.updateBoard(Number(params.boardId), body)
            .then((result) => {
              ok(response, result.rows)
            })
            .catch((err) => {
              errorNotFound(response, errorUpdateBoard)
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
/**
 * @api {delete} /api/board:boardId deletespecialboard
 * @apiName removeBoard
 * @apiGroup board
 *
 * @apiParam {String} boardId boards unique ID.
 *
 * @apiSuccess (200) {Object} acceptRemoveBoard  board removed.
 *
 * @apiError (404) {Object} errorRemoveBoard board not founded. remove failed.
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.removeBoard = (request, response, params) => {
  const temp = params
  temp.boardId = Number(params.boardId)
  const valid = ajv.validate(schema.boardIdSchema, temp)
  const validatonError = ajv.errors
  const errorRemoveBoard = {
    type: 'errorRemoveBoard',
    explain: 'board not founded. remove failed'
  }
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (valid) {
      database.removeBoardDb(temp.boardId)
        .then((result) => {
          ok(response, result)
        })
        .catch((err) => {
          errorNotFound(response, errorRemoveBoard)
          error(response, err)
        })
    } else {
      error(response, validatonError)
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
