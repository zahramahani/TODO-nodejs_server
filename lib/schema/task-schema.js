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
    check: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    }
  },
  required: [
    'todoId',
    'userId',
    'check',
    'description'
  ]
}
