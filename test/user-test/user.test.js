require('dotenv').config({
    path: '../.env-test'
})

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
    server
} = require('../../lib/server.js')
