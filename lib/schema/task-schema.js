exports.taskIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
  taskId: {
  type: 'string',
  format:'uuid'
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
      type: 'string'
    },
    check: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    image_url: {
      type: 'string'
    },
  },
  required: [
    'todoId',
    'check',
    'description',
    'image_url'
  ]
}
