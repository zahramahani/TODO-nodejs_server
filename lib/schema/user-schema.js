exports.userIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userId: {
      type: 'integer'
    }
  },
  required: [
    'userId'
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
    }
  },
  required: [
    'userId',
    'firstName',
    'lastName',
    'userName',
    'password'
  ]
}

exports.userloginSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userName: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [
    'userName',
    'password'
  ]
}

exports.userSignupSchema = {
  type: 'object',
  additionalProperties: true,
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
    }
  },
  required: [
    'firstName',
    'lastName',
    'userName',
    'password'
  ]
}
