const Ajv = require('ajv')
const uuidv4 = require('uuid/v4')
const getRawBody = require('raw-body')
const url = require('url')
const tododb = require('../db/db').todo
const {
  ok,
  created,
  error,
  errorNotFound
} = require('../util/response')
const schema = require('../schema/todo-schema')

const ajv = new Ajv({
  allErrors: true
})
/**
 * @api {get} /api/todo:boardId Request  todos information
 * @apiName getTodos
 * @apiGroup todo
 *
 * @apiParam {String} boardId boards unique ID.
 *
 * @apiSuccess {String} boardId the id of the board which todo belongs to it.
 * @apiSuccess {String}  title the title of the todo.
 * @apiSuccess {Object[]}  tasks the tasks of todo.
 *
 * @apiError (404) {Object} errorGetTodos todo not founded. mismatch with boardId.
 *
 */

exports.getTodos = (request, response) => {
  const errorGetTodos = {
    type: 'errorGetTodos',
    explain: 'todo not founded. mismatch with boardId '
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = url.parse(request.url, true).query
  console.log('gets')
  console.log(query.boardId)
  if (query.boardId) {
    const todo = tododb.find({
      boardId: query.boardId
    })
    if (todo) {
      ok(response, todo)
    } else {
      errorNotFound(response, errorGetTodos)
    }
  } else {
    const todo = tododb.find()
    ok(response, todo)
  }
}

/**
 * @api {get} /api/todo:todoId Request  special todo information.
 * @apiName getTodoById
 * @apiGroup todo
 *
 * @apiParam {String} todoId todo unique ID.
 *
 * @apiSuccess {String}  boardId  the id of the board which todo belongs to it.
 * @apiSuccess {String}  title  the title of the todo.
 * @apiSuccess {Object[]}  tasks  the tasks of todo.
 *
 * @apiError (404) {Object} errorGetTodoById todo not founded. mismatch with existance todos.
 * @apiError (400) {Object} validatonError validatonError .
 */
exports.getTodoById = (request, response, params) => {
  const valid = ajv.validate(schema.todoIdSchema, params)
  const validatonError = ajv.errors
  const errorGetTodoById = {
    type: 'errorGetTodoById',
    explain: 'todo not founded. mismatch with existance todos '
  }
  if (valid) {
    const todo = tododb.findOne({
      id: params.todoId
    })
    if (todo) {
      ok(response, todo)
    } else {
      errorNotFound(response, errorGetTodoById)
    }
  } else {
    error(response, validatonError)
  }
}
/**
 * @api {post} /api/todo create new todo
 * @apiName addTodo
 * @apiGroup todo
 *
 * @apiParam {String}  boardId  the id of the board which todo belongs to it.
 * @apiParam {String}  title  the title of the todo.
 * @apiParam  {Object[]}  tasks  the tasks of todo.
 *
 * @apiSuccess (201) {Object}  acceptAddTodo  todo added successfully.
 *
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.addTodo = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      console.log('boddy buffer')
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.todoSchema, body)
      const validatonError = ajv.errors
      const acceptAddTodo = {
        type: 'acceptAddTodo',
        explain: 'todo added successfully.'
      }
      if (valid) {
        console.log('valid')
        const todo = {
          id: uuidv4(),
          ...body
        }
        tododb.insert(todo)
        created(response, acceptAddTodo)
      } else {
        console.log('error')
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err)
    })
}
/**
 * @api {put} /api/todo:todoId editing specialtodo
 * @apiName updateTodo
 * @apiGroup todo
 *
 * @apiParam {String} todoId todo unique ID.
 *
 * @apiParam {String}  boardId  the id of the board which todo belongs to it.
 * @apiParam {String}  title  the title of the todo.
 * @apiParam  {Object[]}  tasks  the tasks of todo.
 *
 * @apiSuccess (200) {Object} acceptUpdateTodo  todo updated.
 *
 * @apiError (404) {Object} errorUpdateTodo todo not founded. update failed.
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.updateTodo = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.todoSchema, body)
      const validatonError = ajv.errors
      const acceptUpdateTodo = {
        type: 'acceptUpdateTodo',
        Explain: ' todo updated.'
      }
      const errorUpdateTodo = {
        type: 'errorUpdateTodo',
        explain: 'todo not founded.update failed '
      }
      if (valid) {
        var todo = tododb.findOne({
          id: params.todoId
        })

        if (todo) {
          todo = { ...todo, ...body }

          tododb.update(todo)

          ok(response, acceptUpdateTodo)
        } else {
          errorNotFound(response, errorUpdateTodo)
        }
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err)
    })
}

/**
 * @api {delete} /api/todo:todoId deleting special todo
 * @apiName removeTodo
 * @apiGroup todo
 *
 * @apiParam {String} todoId todo unique ID.
 *
 * @apiSuccess (200) {Object} acceptRemoveTodo  todo removed.
 *
 * @apiError (404) {Object} errorRemoveTodo todonot founded. remove failed.
 * @apiError (400) {Object} validatonError validatonError.
 */
exports.removeTodo = (request, response, params) => {
  const valid = ajv.validate(schema.todoIdSchema, params)
  const validatonError = ajv.errors
  const acceptRemoveTodo = {
    type: 'acceptRemoveTask',
    explain: 'task removed'
  }
  const errorRemoveTodo = {
    type: 'errorRemoveTask',
    explain: 'task not founded. remove failed'
  }
  if (valid) {
    const todo = tododb.findOne({
      id: params.todoId
    })
    if (todo) {
      tododb.remove(todo)
      ok(response, acceptRemoveTodo)
    } else {
      errorNotFound(response, errorRemoveTodo)
    }
  } else {
    error(response, validatonError)
  }
}