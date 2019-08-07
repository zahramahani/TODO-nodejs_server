exports.taskIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    taskId: {
      type: 'integer'
    }
  },
  required: [
    'taskId'
  ]
}
exports.taskSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    todoId: {
      type: 'integer'
    },
    userId: {
      type: 'integer'
    },
    // taskId: {
    //   type: 'integer'
    // },
    done: {
      type: 'boolean'
    },
    text: {
      type: 'string'
    }
  },
  required: [
    // 'taskId',
    'todoId',
    'userId',
    'done',
    'text'
  ]
}
