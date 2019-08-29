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
const schema = require('../schema/todo-schema')
const { hasAccess } = require('../auth/auth')

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
      database.getBoardsTodos(query.boardId)
        .then((result) => {
          ok(response, result.rows)
        })
        .catch((err) => {
          error(response, err)
          errorNotFound(response, errorGetTodos)
        })
    } else {
      database.getTodos()
        .then((result) => {
          ok(response, result.rows)
        })
        .catch((err) => {
          error(response, err)
          errorNotFound(response, errorGetTodos)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.getNumberOfTodosDoneTask = (request, response) => {
  const errorGetNumberOfTodosDoneTask = {
    type: 'errorGetNumberOFTodosDoneTask',
    explain: 'todo not founded. mismatch with boardId '
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.todoId)
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (query.todoId) {
      database.getTodosDoneTasks(query.todoId)
        .then((result) => {
          ok(response, result)
        })
        .catch((err) => {
          error(response, err)
          errorNotFound(response, errorGetNumberOfTodosDoneTask)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
exports.getNumberOfTodos = (request, response) => {
  const errorGetNumberOfTodos = {
    type: 'errorGetNumberOFTodos',
    explain: 'todo not founded. mismatch with boardId '
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
      database.getNumberofBoardsTodos(query.boardId)
        .then((result) => {
          ok(response, result)
        })
        .catch((err) => {
          error(response, err)
          errorNotFound(response, errorGetNumberOfTodos)
        })
    }
  } else {
    errorNotValid(response, errorNotvalid)
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
  const temp = params
  temp.todoId = Number(params.todoId)
  const valid = ajv.validate(schema.todoIdSchema, temp)
  const validatonError = ajv.errors
  const errorGetTodoById = {
    type: 'errorGetTodoById',
    explain: 'todo not founded. mismatch with existance todos '
  }
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (valid) {
      database.getTodos(temp.todoId)
        .then((result) => {
          ok(response, result.rows)
        })
        .catch((err) => {
          error(response, err)
          errorNotFound(response, errorGetTodoById)
        })
    } else {
      error(response, validatonError)
    }
  } else {
    errorNotValid(response, errorNotvalid)
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
      // const acceptAddTodo = {
      //   type: 'acceptAddTodo',
      //   explain: 'todo added successfully.'
      // }
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      const tokenValidation = hasAccess(request)
      if (tokenValidation.verify) {
        if (valid) {
          database.addTodo(body)
            .then((result) => {
              created(response, result.rows)
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          console.log('error')
          error(response, validatonError)
        }
      } else {
        errorNotValid(response, errorNotvalid)
      }
    }
    ).catch((err) => {
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
      // const acceptUpdateTodo = {
      //   type: 'acceptUpdateTodo',
      //   Explain: ' todo updated.'
      // }
      const errorUpdateTodo = {
        type: 'errorUpdateTodo',
        explain: 'todo not founded.update failed '
      }
      const errorNotvalid = {
        type: 'errorNotValid',
        explain: 'unauthorized'
      }
      const tokenValidation = hasAccess(request)
      if (tokenValidation.verify) {
        if (valid) {
          database.updateTodo(params.todoId, body)
            .then((result) => {
              ok(response, result)
            })
            .catch((err) => {
              errorNotFound(response, errorUpdateTodo)
              error(response, err)
            })
        } else {
          error(response, validatonError)
        }
      } else {
        errorNotValid(response, errorNotvalid)
      }
    }
    ).catch((err) => {
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
  const temp = params
  console.log('in remove todo')
  console.log(temp.todoId)
  temp.todoId = Number(params.todoId)
  const valid = ajv.validate(schema.todoIdSchema, temp)
  const validatonError = ajv.errors
  // const acceptRemoveTodo = {
  //   type: 'acceptRemoveTask',
  //   explain: 'task removed'
  // }
  const errorRemoveTodo = {
    type: 'errorRemoveTodo',
    explain: 'Todo not founded. remove failed'
  }
  const errorNotvalid = {
    type: 'errorNotValid',
    explain: 'unauthorized'
  }
  const tokenValidation = hasAccess(request)
  if (tokenValidation.verify) {
    if (valid) {
      database.removeTodo(temp.todoId)
        .then((result) => {
          ok(response, result)
        })
        .catch((err) => {
          errorNotFound(response, errorRemoveTodo)
          error(response, err)
        })
    } else {
      error(response, validatonError)
    }
  } else {
    errorNotValid(response, errorNotvalid)
  }
}
