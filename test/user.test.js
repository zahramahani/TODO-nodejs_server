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
// require('../../index')

const user = {
  userName: 'sarah',
  password: '12345Ss!'
}

const loginUser = {
  firstName: 'sarah',
  lastName: 'khorashadi',
  userName: 'sashadi',
  password: '12345Ss!'
}

describe('user Test', () => {
  describe('Login Test', () => {
    it('It should login successfully', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end((error, result) => {
          // console.log(result.body)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('token')
            done()
          }
        })
    }).timeout(30000)
    it('It should NOT login - wrong password', (done) => {
      const userWithWrongPassword = {
        username: 'sarah',
        password: '1234'
      }
      chai.request(server)
        .post('/api/login')
        .send(userWithWrongPassword)
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
    })
    it('It should NOT login - username missing', (done) => {
      const userWithoutUsername = {
        password: '1234'
      }
      chai.request(server)
        .post('/api/login')
        .send(userWithoutUsername)
        .end((error, result) => {
          // console.log(result)
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
    })
    it('It should NOT login - password missing', (done) => {
      const userWithoutUsername = {
        user: 'razi'
      }
      chai.request(server)
        .post('/api/login')
        .send(userWithoutUsername)
        .end((error, result) => {
          // console.log(result)
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
    })
  })
  describe('signup Test', () => {
    it('It should signup successfully', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send(loginUser)
        .end((error, result) => {
          console.log(result.body.message)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.all.keys('message')
            expect(result.body.message).to.equal('signup successfully')
            done()
          }
        })
    }).timeout(30000)
    it('It should NOT signup - Firstname missing', (done) => {
      const userWithoutFirstname = {
        password: '1234'
      }
      chai.request(server)
        .post('/api/signup')
        .send(userWithoutFirstname)
        .end((error, result) => {
          console.log(result)
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
    })
    it('It should NOT signup - wrong password', (done) => {
      const userWithWrongPassword = {
        firstName: 'sarah',
        lastName: 'khorashadi',
        userName: 'sashadi',
        password: '1234'
      }
      chai.request(server)
        .post('/api/signup')
        .send(userWithWrongPassword)
        .end((error, result) => {
          console.log(result.body.message)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('verified')
            expect(result.body.verified).to.equal(false)
            done()
          }
        })
    })
  })
  describe('getUser Test', () => {
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
    it('It should getUser successfully', (done) => {
      chai.request(server)
        .get('/api/getMember?boardId=1')
        .set('Authorization', `Bearer ${token}`)
        .end((error, result) => {
          console.log(token)
          console.log(result.body)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('getUser successfully')
            done()
          }
        })
    }).timeout(30000)
    it('It should NOT get member - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/getMember?boardId=1')
        .end((error, result) => {
          console.log(result.body.type)
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
    }).timeout(30000)
  })
  describe('addUserToBoard Test', () => {
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
    it('It should add user to board', (done) => {
      const test = {
        boardId: 6,
        userId: 4
      }
      chai.request(server)
        .post('/api/addMemberToBoard')
        .set('Authorization', `Bearer ${token}`)
        .send(test)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(201)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('created')
            done()
          }
        })
    }).timeout(30000)
    it('It should not add user to board - unathorized', (done) => {
      const test = {
        boardId: 6,
        userId: 3
      }
      chai.request(server)
        .post('/api/addMemberToBoard')
        .send(test)
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
    }).timeout(30000)
    it('It should not add user to board - wrongtoken', (done) => {
      const myToken = 'sarah'
      const test = {
        boardId: 6,
        userId: 3
      }
      chai.request(server)
        .post('/api/addMemberToBoard')
        .set('Authorization', `Bearer ${myToken}`)
        .send(test)
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
    }).timeout(30000)
    it.only('It should not add user to board - invalid', (done) => {
      const test = {
        boardId: 42
      }
      chai.request(server)
        .post('/api/addMemberToBoard')
        .set('Authorization', `Bearer ${token}`)
        .send(test)
        .end((error, result) => {
          console.log(result)
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Validation Error')
            done()
          }
        })
    }).timeout(30000)
  })
})
