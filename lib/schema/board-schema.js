exports.boardIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardId: {
      type: 'string',
      format: 'uuid'
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
    board_name: {
      type: 'string'
    },
    complete: {
      type: 'boolean'
    },
    owner: {
      type: 'string'
    },
    members:
    {
      type: 'array',
      items: {
        type: 'string'
      }

    },
    images:
    {
      type: 'array',
      items: {
        type: 'string'
      }

    },
    todos: {
      type: 'array',
      items: {
        type: 'object'
      }

    }
  },
  required: [
    'board_name',
    'complete',
    'owner',
    'members',
    'images',
    'todos'
  ]
}
