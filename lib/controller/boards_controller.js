const Ajv = require('ajv')
const getRawBody = require('raw-body')
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
  // const boards = boardDatabase.getBoards()
  // ok(response, boards)
  database.getBoards()
    .then((result) => {
      // const responseBody = {
      //   status: 'Ok',
      //   result: result
      // }
      ok(response, result)
    })
    .catch((err) => {
      error(response, err)
    })
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
  if (valid) {
    database.getBoards(temp.boardId)
      .then((result) => {
        ok(response, result.rows)
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

      const valid = ajv.validate(schema.boardSchema, body)
      const validatonError = ajv.errors
      // avoid repeatitive boardName
      // const repeatitiveNameFlag = false
      // const acceptAddBoard = {
      //   type: 'acceptAddBoard',
      //   explain: 'board added successfully '
      // }

      // avoid repeatitive boardName
      // const condition = database.hasBoard(body.name)
      // console.log("look at me");
      // console.log(condition)
      // console.log("im here");
      // debugger
      // if ((database.hasBoard(body.name)) === null) {
      // this.repeatitiveNameFlag = true
      // }
      if (valid) {
        database.addBoard(body)
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
      if (valid) {
        database.updateBoard(params.boardId, body)
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
  // const acceptRemoveBoard = {
  //   type: 'acceptRemoveBoard',
  //   explain: 'board removed'
  // }
  const errorRemoveBoard = {
    type: 'errorRemoveBoard',
    explain: 'board not founded. remove failed'
  }
  if (valid) {
    database.removeBoard(temp.boardId)
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
}
