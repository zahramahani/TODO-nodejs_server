exports.userIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userId: {
      type: 'integer'
    }
  },
  required: [
    'taskId'
  ]
}
exports.userSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'integer'
    },
    image: {
      type: 'string'
    },
    required: [
      // 'taskId',
      'userId',
      'firstName',
      'lastName',
      'image'
    ]
  }
}
