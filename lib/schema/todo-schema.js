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
    compelete: {
      type: 'boolean'
    },
    title: {
      type: 'string'
    }
    // ,
    // tasks: {
    //   type: 'array',
    //   items: {
    //     type: 'object'
    //   }
    // }

  },
  required: [
    'boardId',
    'compelete',
    'title'
    // ,
    // 'tasks'
  ]
}
