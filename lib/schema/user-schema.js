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
      type: 'string'
    },
    image: {
      type: 'string'
    },
    userName: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    required: [
      // 'taskId',
      'userId',
      'firstName',
      'lastName',
      'image',
      'userName',
      'password'
    ]
  }
}
