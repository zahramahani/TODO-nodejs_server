const Loki = require('lokijs')
const db = new Loki('todoProject.db')
const todo = db.addCollection('todo')
const task = db.addCollection('task')
const board = db.addCollection('board')
exports.todo = todo
exports.task = task
exports.board = board
