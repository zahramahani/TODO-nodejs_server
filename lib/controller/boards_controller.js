const Ajv = require('ajv')
const uuidv4 = require('uuid/v4')
const getRawBody = require('raw-body')

const boarddb = require('../db/db').board
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
 * 
 */
exports.getBoards = (request, response) => {
  const boards = boarddb.find()
  ok(response, boards)
}

/**
 * @api {get} /api/board:boardId Request  special board information
 * @apiName getBoardById
 * @apiGroup board
 * 
 * @apiParam {String} boardId boards unique ID.
 *
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
  const valid = ajv.validate(schema.boardIdSchema, params)
  const validatonError = ajv.errors
  const errorGetBoardById = {
    type : 'errorGetBoardById',
    explain : "board not founded.mismatch with existance boards"
  }
  if (valid) {
    const board = boarddb.findOne({
      id: params.boardId
    })
    if (board) {
      ok(response, board)
    } else {
      errorNotFound(response,errorGetBoardById)
    }
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
      const acceptAddBoard = {
        type : 'acceptAddBoard',
        explain : "board added successfully "
      }
      if (valid) {
        const board = {
          id: uuidv4(),
          ...body
        }
        boarddb.insert(board)
        created(response,acceptAddBoard)
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
      const acceptUpdateBoard = {
        type : 'acceptUpdateBoard',
        explain : "board updated"
      }
      const errorUpdateBoard = {
        type : 'errorUpdateBoard',
        explain : "board not founded. update failed"
      }
      if (valid) {
        let board = boarddb.findOne({
          id: params.boardId
        })

        if (board) {
          board = { ...board, ...body }

          boarddb.update(board)

          ok(response,acceptUpdateBoard)
        } else {
          errorNotFound(response,errorUpdateBoard)
        }
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
  const valid = ajv.validate(schema.boardIdSchema, params)
  const validatonError = ajv.errors
  const acceptRemoveBoard ={
    type : 'acceptRemoveBoard',
    explain : "board removed"
  } 
  const errorRemoveBoard ={
    type : 'errorRemoveBoard',
    explain : "board not founded. remove failed"
  } 
  if (valid) {
    const board = boarddb.findOne({
      id: params.boardId
    })
    if (board) {
      boarddb.remove(board)
      ok(response,acceptRemoveBoard)
    } else {
      errorNotFound(response,errorRemoveBoard)
    }
  } else {
    error(response, validatonError)
  }
}
