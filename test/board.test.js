require('dotenv').config({
  path: '../.env'
})

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
  server
} = require('../lib/server')
const user = {
  userName: 'gholi',
  password: '12345@zZ'
}
// router.get('/api/board', getBoards)
// router.get('/api/board/:boardId', getBoardById)
// router.post('/api/board', addBoard)
// router.put('/api/board/:boardId', updateBoard)
// router.delete('/api/board/:boardId', removeBoard)

describe('Board Integration Test', () => {
  describe('Add Board Test', () => {
    let token
    console.log('before login')
    before('Get Token', (done) => {
      console.log('after login')
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end((error, result) => {
          if (error) {
            console.log('after login error')
            done(error)
          } else {
            console.log('after login token')
            token = result.body.token
            done()
          }
        })
    })
    it('It should add new Board', (done) => {
      const testBoard = {
        name: 'testBoard',
        done: false,
        ownerId: 0
      }
      chai.request(server)
        .post('/api/board')
        .set('authorization', `Bearer ${token}`)
        .send(testBoard)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(201)
            done()
          }
        })
    })
    it('It should NOT add new Board - authorization header is NOT exist', (done) => {
      const user = {
        userName: 'goli',
        password: '12345@zZ'
      }
      chai.request(server)
        .post('/api/board')
        .send(user)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            console.log('ddsdf')
            console.log(result)
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorUserNotFound')
            done()
          }
        })
    }).timeout(50000)
    it('It should NOT add new Board - authorization header is NOT exist', (done) => {
      const testBoard = {
        name: 'testBoard',
        done: false,
        ownerId: 0
      }
      chai.request(server)
        .post('/api/board')
        .send(testBoard)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorUserNotFound')
            done()
          }
        })
    }).timeout(30000)
    it('It should NOT add new Board - token is invalid', (done) => {
      const testBoard = {
        name: 'testBoard',
        done: false,
        ownerId: 0
      }
      const wrongToken = '1234'
      chai.request(server)
        .post('/api/board')
        .set('authorization', `Bearer ${wrongToken}`)
        .send(testBoard)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorUserNotFound')
            done()
          }
        })
    })
    it('It should NOT add new Board - body is NOT exist', (done) => {
      chai.request(server)
        .post('/api/board')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('type')
            expect(result.body.type).to.equal('errorUserNotFound')
            done()
          }
        })
    })
    it('It should NOT add new Board - body is invalid', (done) => {
      const testBoard = {
        name: 'testBoard',
        done: false
      }
      chai.request(server)
        .post('/api/board')
        .set('authorization', `Bearer ${token}`)
        .send(testBoard)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            done()
          }
        })
    })
  })
  // describe('get Board Test', () => {
  //   let token
  //   console.log('before login')
  //   before('Get Token', (done) => {
  //     console.log('after login')
  //     chai.request(server)
  //       .post('/api/login')
  //       .send(user)
  //       .end((error, result) => {
  //         if (error) {
  //           console.log('after login error')
  //           done(error)
  //         } else {
  //           console.log('after login token')
  //           token = result.body.token
  //           done()
  //         }
  //       })
  //   })
  //   it('It should add new Board', (done) => {
  //     const testBoard = {
  //       name: 'testBoard',
  //       done: false,
  //       ownerId: 0
  //     }
  //     chai.request(server)
  //       .post('/api/board')
  //       .set('authorization', `Bearer ${token}`)
  //       .send(testBoard)
  //       .end((error, result) => {
  //         if (error) {
  //           done(error)
  //         } else {
  //           expect(result).to.have.any.keys('statusCode')
  //           expect(result.statusCode).to.equal(201)
  //           done()
  //         }
  //       })
  //   })
  //   it('It should NOT add new Board - authorization header is NOT exist', (done) => {
  //     const user = {
  //       userName: 'goli',
  //       password: '12345@zZ'
  //     }
  //     chai.request(server)
  //       .post('/api/board')
  //       .send(user)
  //       .end((error, result) => {
  //         if (error) {
  //           done(error)
  //         } else {
  //           console.log('ddsdf')
  //           console.log(result)
  //           expect(result).to.have.any.keys('statusCode')
  //           expect(result.statusCode).to.equal(400)
  //           expect(result).to.have.any.keys('type')
  //           expect(result.body.type).to.equal('errorUserNotFound')
  //           done()
  //         }
  //       })
  //   }).timeout(50000)
  //   it('It should NOT add new Board - authorization header is NOT exist', (done) => {
  //     const testBoard = {
  //       name: 'testBoard',
  //       done: false,
  //       ownerId: 0
  //     }
  //     chai.request(server)
  //       .post('/api/board')
  //       .send(testBoard)
  //       .end((error, result) => {
  //         if (error) {
  //           done(error)
  //         } else {
  //           expect(result).to.have.any.keys('statusCode')
  //           expect(result.statusCode).to.equal(400)
  //           expect(result).to.have.any.keys('type')
  //           expect(result.body.type).to.equal('errorUserNotFound')
  //           done()
  //         }
  //       })
  //   }).timeout(30000)
  //   it('It should NOT add new Board - token is invalid', (done) => {
  //     const testBoard = {
  //       name: 'testBoard',
  //       done: false,
  //       ownerId: 0
  //     }
  //     const wrongToken = '1234'
  //     chai.request(server)
  //       .post('/api/board')
  //       .set('authorization', `Bearer ${wrongToken}`)
  //       .send(testBoard)
  //       .end((error, result) => {
  //         if (error) {
  //           done(error)
  //         } else {
  //           expect(result).to.have.any.keys('statusCode')
  //           expect(result.statusCode).to.equal(400)
  //           expect(result).to.have.any.keys('type')
  //           expect(result.body.type).to.equal('errorUserNotFound')
  //           done()
  //         }
  //       })
  //   })
  //   it('It should NOT add new Board - body is NOT exist', (done) => {
  //     chai.request(server)
  //       .post('/api/board')
  //       .set('authorization', `Bearer ${token}`)
  //       .end((error, result) => {
  //         if (error) {
  //           done(error)
  //         } else {
  //           expect(result).to.have.any.keys('statusCode')
  //           expect(result.statusCode).to.equal(400)
  //           expect(result).to.have.any.keys('type')
  //           expect(result.body.type).to.equal('errorUserNotFound')
  //           done()
  //         }
  //       })
  //   })
  //   it('It should NOT add new Board - body is invalid', (done) => {
  //     const testBoard = {
  //       name: 'testBoard',
  //       done: false
  //     }
  //     chai.request(server)
  //       .post('/api/board')
  //       .set('authorization', `Bearer ${token}`)
  //       .send(testBoard)
  //       .end((error, result) => {
  //         if (error) {
  //           done(error)
  //         } else {
  //           expect(result).to.have.any.keys('statusCode')
  //           expect(result.statusCode).to.equal(400)
  //           done()
  //         }
  //       })
  //   })
  // })
})
