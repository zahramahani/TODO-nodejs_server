// const { getNumberOfTodosDoneTask, getNumberOfTodos, getTodos, getTodoById, addTodo, updateTodo, removeTodo } = require('../controller/todo-controller')

require('dotenv').config({
  path: '../../dotenv'
})

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
  server
} = require('../../lib/server.js')
require('../../index')

const user = {
  username: 'goli',
  password: '12345@zZ'
}

describe('Todo Integration Test', () => {
  describe('getTodos Test', () => {
    let token
    before('Get Token', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            token = result.body.token
            done()
          }
        })
    })
    it('It should getTodos successfully', (done) => {
      chai.request(server)
        .get('/api/todo')
      // .send(user)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('type')
            expect(result.body).to.have.all.keys('token')
            done()
          }
        })
    }).timeout(10000)
  })
})