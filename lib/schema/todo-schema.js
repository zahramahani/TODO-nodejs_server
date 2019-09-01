exports.todoIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    todoId: {
      type: 'integer'
    }
  },
  required: [
    'todoId'
  ]
}
exports.todoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardId: {
      type: 'integer'
    },
    complete: {
      type: 'boolean'
    },
    title: {
      type: 'string'
    }
  },
  required: [
    'boardId',
    'complete',
    'title'
  ]
}
