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
    //, members:
    // {
    //   type: 'array',
    //   items: {
    //     type: 'string'
    //   }

    // },
    // images:
    // {
    //   type: 'array',
    //   items: {
    //     type: 'string'
    //   }

    // },
    // todos: {
    //   type: 'array',
    //   items: {
    //     type: 'object'
    //   }

    // }
  },
  required: [
    'name',
    'done',
    'ownerId'
    // ,'members',
    // ,'members',
    // 'images',
    // 'todos'
  ]
}
