exports.boardIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardId: {
      type: 'integer'
    }
  },
  required: [
    'boardId'
  ]
}
exports.boardSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string'
    },
    done: {
      type: 'boolean'
    },
    ownerId: {
      type: 'integer'
    }
  },
  required: [
    'name',
    'done',
    'ownerId'
  ]
}
