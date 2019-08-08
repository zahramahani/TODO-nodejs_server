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
const schema = require('../schema/task-schema')

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

exports.getTasks = (request, response) => {
  const errorGetTasks = {
    type: 'errorGetTasks',
    explain: 'tasks not founded.mismatch with todoid'
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets')
  console.log(query.todoId)
  if (query.todoId) {
    database.getTodosTasks(query.todoId)
      .then((result) => {
        ok(response, result.rows)
      })
      .catch((err) => {
        errorNotFound(response, errorGetTasks)
        error(response, err)
      })
  } else {
    database.getTasks()
      .then((result) => {
        ok(response, result.rows)
      })
      .catch((err) => {
        errorNotFound(response, errorGetTasks)
        error(response, err)
      })
  }
}
exports.getNumberOfTasks = (request, response) => {
  const errorGetNumberOfTasks = {
    type: 'errorGetNumberOFTasks',
    explain: 'todo not founded. mismatch with boardId '
  }
  // eslint-disable-next-line node/no-deprecated-api
  var query = URL.parse(request.url, true).query
  console.log('gets in task')
  console.log(query.todoId)
  if (query.todoId) {
    database.getNumberofTodosTask(query.todoId)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        error(response, err)
        errorNotFound(response, errorGetNumberOfTasks)
      })
  }
}
/**
 * @api {get} /api/task:taskId Request  special task information.
 * @apiName getTaskById
 * @apiGroup task
 *
 * @apiParam {String} taskId task unique ID.
 *
 * @apiSuccess {String} todoId the id of the todo which task belongs to it.
 * @apiSuccess {Boolean} check true if task is done.
 * @apiSuccess {String}  description the text of the task.
 * @apiSuccess {String}  image_url the image of owner of the task.
 *
 * @apiError (404) {Object} errorGetTaskById task not founded. mismatch with existance tasks.
 * @apiError (400) {Object} validatonError validatonError .
 */

exports.getTaskById = (request, response, params) => {
  const temp = params
  temp.taskId = Number(params.taskId)
  const valid = ajv.validate(schema.taskIdSchema, temp)
  const validatonError = ajv.errors
  const errorGetTaskById = {
    type: 'errorGetTaskById',
    explain: 'task not founded.mismatch with existance tasks'
  }
  if (valid) {
    database.getTasks(temp.taskId)
      .then((result) => {
        ok(response, result.rows)
      })
      .catch((err) => {
        errorNotFound(response, errorGetTaskById)
        error(response, err)
      })
  } else {
    error(response, validatonError)
  }
}
/**
 * @api {post} /api/task create new task
 * @apiName addTask
 * @apiGroup task
 *
 * @apiParam {String} todoId the id of the todo which task belongs to it.
 * @apiParam {Boolean} check true if task is done.
 * @apiParam {String}  description the text of the task.
 * @apiParam {String}  image_url the image of owner of the task.
 *
 * @apiSuccess (201) {Object}  acceptAddTask  task added successfully.
 *
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.addTask = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.taskSchema, body)
      const validatonError = ajv.errors
      // const acceptAddTask = {
      //   type: 'acceptAddTask',
      //   explain: 'task added successfully '
      // }
      if (valid) {
        database.addTask(body)
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
 * @api {put} /api/task:taskId editing specialtask
 * @apiName updateTask
 * @apiGroup task
 *
 * @apiParam {String} taskId task unique ID.
 *
 * @apiParam {String} todoId the id of the todo which task belongs to it.
 * @apiParam {Boolean} check true if task is done.
 * @apiParam {String}  description the text of the task.
 * @apiParam {String}  image_url the image of owner of the task.
 *
 * @apiSuccess (200) {Object} acceptUpdateTask  task updated.
 *
 * @apiError (404) {Object} errorUpdateTask task not founded. update failed.
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.updateTask = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.taskSchema, body)
      const validatonError = ajv.errors
      // const acceptUpdateTask = {
      //   type: 'acceptUpdateTask',
      //   explain: 'task updated'
      // }
      const errorUpdateTask = {
        type: 'errorUpdateTask',
        explain: 'task not founded. update failed'
      }
      if (valid) {
        database.updateTask(params.taskId, body)
          .then((result) => {
            ok(response, result)
          })
          .catch((err) => {
            errorNotFound(response, errorUpdateTask)
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
 * @api {delete} /api/task:taskId deleting special task
 * @apiName removeTask
 * @apiGroup task
 *
 * @apiParam {String} taskId task unique ID.
 *
 * @apiSuccess (200) {Object} acceptRemoveTask  task removed.
 *
 * @apiError (404) {Object} errorRemoveTask tasknot founded. remove failed.
 * @apiError (400) {Object} validatonError validatonError.
 */

exports.removeTask = (request, response, params) => {
  const temp = params
  temp.taskId = Number(params.taskId)
  const valid = ajv.validate(schema.taskIdSchema, temp)
  const validatonError = ajv.errors
  // const acceptRemoveTask = {
  //   type: 'acceptRemoveTask',
  //   explain: 'task removed'
  // }
  const errorRemoveTask = {
    type: 'errorRemoveTask',
    explain: 'task not founded. remove failed'
  }
  if (valid) {
    database.removeTask(temp.taskId)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        errorNotFound(response, errorRemoveTask)
        error(response, err)
      })
  } else {
    error(response, validatonError)
  }
}
