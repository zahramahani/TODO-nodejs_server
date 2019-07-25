exports.todoIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
  todoId: {
  type: 'string',
  format:'uuid'
  }
  },
  required: [
  'TodoId'
  ]
}
exports.todoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardId: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    tasks:{
      type: 'array',
      items:{
        type:'object'
      }
    } 
    
  },
  required: [
    'boardId',
    'title',
    'tasks'
  ]
}
