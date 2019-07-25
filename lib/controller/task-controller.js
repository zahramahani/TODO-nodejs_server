const Ajv = require('ajv')
const uuidv4 = require('uuid/v4')
const getRawBody = require('raw-body')
const url= require('url')

const taskdb = require('../db/db').task
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
    type : 'errorGetTasks',
    explain : "tasks not founded.mismatch with todoid"
  }
  var query = url.parse(request.url, true).query
  console.log('gets')
  console.log(query.todoId)
  if (query.todoId) {
    const task = taskdb.find({
      todoId: query.todoId
    })
    if (task) {
      ok(response, task)
    } else {
      errorNotFound(response,errorGetTasks)
    }

  } else {
   const task = taskdb.find()
   ok(response, task)
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
  const valid = ajv.validate(schema.taskIdSchema, params)
  const validatonError = ajv.errors
  const errorGetTaskById = {
    type : 'errorGetTaskById',
    explain : "task not founded.mismatch with existance tasks"
  }
  if (valid) {
    const task = taskdb.findOne({
      id: params.taskId
    })
    if (task) {
      ok(response, task)
    } else {
      errorNotFound(response,errorGetTaskById)
    }
  } else {
    error(response, validatonError)
  }
}

exports.getTasksByTodoId = (request, response, params) => {
  const valid = ajv.validate(schema.todoIdSchema, params)
  const validatonError = ajv.errors
  const errorGetTasksByTodoId = {
    type : 'errorGetTasksByTodoId',
    explain : "todo not founded.mismatch with existance todos"
  }
  if (valid) {
    const task = taskdb.find({
      id: params.taskId
    })
    if (task) {
      ok(response, task)
    } else {
      errorNotFound(response,errorGetTasksByTodoId)
    }
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
      const acceptAddTask = {
        type : 'acceptAddTask',
        explain : "task added successfully "
      }
      if (valid) {
        const task = {
          id: uuidv4(),
          ...body
        }
        taskdb.insert(task)
        created(response,acceptAddTask)
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
      const acceptUpdateTask = {
        type : 'acceptUpdateTask',
        explain : "task updated"
      }
      const errorUpdateTask = {
        type : 'errorUpdateTask',
        explain : "task not founded. update failed"
      }
      if (valid) {
        let task = taskdb.findOne({
          id: params.taskId
        })

        if (task) {
          task = { ...task, ...body }

          taskdb.update(task)

          ok(response,acceptUpdateTask)
        } else {
          errorNotFound(response,errorUpdateTask)
        }
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
  const valid = ajv.validate(schema.taskIdSchema, params)
  const validatonError = ajv.errors
  const acceptRemoveTask ={
    type : 'acceptRemoveTask',
    explain : "task removed"
  } 
  const errorRemoveTask ={
    type : 'errorRemoveTask',
    explain : "task not founded. remove failed"
  } 
  if (valid) {
    const task = taskdb.findOne({
      id: params.taskId
    })
    if (task) {
      taskdb.remove(task)
      ok(response,acceptRemoveTask)
    } else {
      errorNotFound(response,errorRemoveTask)
    }
  } else {
    error(response, validatonError)
  }
}
