// const { getNumberOfTodosDoneTask, getNumberOfTodos, getTodos, getTodoById, addTodo, updateTodo, removeTodo } = require('../controller/todo-controller')

require('dotenv').config({
  path: '../.env'
})

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
  server
} = require('../lib/server.js')
require('../index')

const user = {
  userName: 'sarah',
  password: '12345Ss!'
}
describe('Todo Test', () => {
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
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(result.status)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('status')
            // expect(result.body).to.have.all.keys('token')
            done()
          }
        })
    }).timeout(10000)
    it('It should getTodos of board successfully', (done) => {
      chai.request(server)
        .get('/api/todo?boardId=42')
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('status')
            // expect(result.body).to.have.all.keys('token')
            done()
          }
        })
    }).timeout(10000)
    it('It should not getTodos - unathorized', (done) => {
      chai.request(server)
        .get('/api/todo')
        // .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
    it('It should not getTodos of board - unathorized', (done) => {
      chai.request(server)
        .get('/api/todo?boardId=42')
        // .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
    it('It should not getTodos of board - wrongToken', (done) => {
      token = 'sarah'
      chai.request(server)
        .get('/api/todo?boardId=42')
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
    it('It should not getTodos - wrongToken', (done) => {
      token = 'sarah'
      chai.request(server)
        .get('/api/todo')
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
  })
  describe('getTodos by Id Test', () => {
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
    it('It should getTodo by Id successfully', (done) => {
      chai.request(server)
        .get('/api/todo/68')
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            // expect(result).to.have.any.keys('status')
            // expect(result.body).to.have.all.keys('token')
            done()
          }
        })
    }).timeout(10000)
    it('It should not getTodo by Id - unathorized', (done) => {
      chai.request(server)
        .get('/api/todo/68')
        // .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
    it('It should not getTodo by Id - wrongToken', (done) => {
      const token = 'sarah'
      chai.request(server)
        .get('/api/todo/68')
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
  })
  describe('add todo Test', () => {
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
    it('It should add todo successfully', (done) => {
      const todoTest = {
        boardId: 42,
        complete: false,
        title: 'testadd'

      }
      chai.request(server)
        .post('/api/todo')
        .send(todoTest)
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(201)
            // expect(result).to.have.any.keys('status')
            // expect(result.status).to.have.any.keys('message')
            // expect(result.status.message).to.equal('created')
            done()
          }
        })
    }).timeout(10000)
    it('It should not add todo - invalid data', (done) => {
      const todoTest = {
        complete: false,
        title: 'testadd'
      }
      chai.request(server)
        .post('/api/todo')
        .send(todoTest)
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('validatonError')
            done()
          }
        })
    }).timeout(10000)
    it('It should not add todo - unathorized', (done) => {
      const todoTest = {
        bpardId: 42,
        complete: false,
        title: 'testadd'
      }
      chai.request(server)
        .post('/api/todo')
        .send(todoTest)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
    it.only('It should not add todo - wrongTpken', (done) => {
      const todoTest = {
        bpardId: 42,
        complete: false,
        title: 'testadd'
      }
      const token = 'sarah'
      chai.request(server)
        .post('/api/todo')
        .send(todoTest)
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorNotValid')
            done()
          }
        })
    }).timeout(10000)
  })
})
