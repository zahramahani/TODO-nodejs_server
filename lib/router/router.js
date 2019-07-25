/* eslint-disable node/no-deprecated-api */
const {getTodosByBoardId, getTodos, getTodoById, addTodo, updateTodo, removeTodo, serveHome } = require('../controller/todo-controller')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard } = require('../controller/boards_controller')
const { getTasks, getTaskById,getTasksByTodoId, addTask, updateTask, removeTask } = require('../controller/task-controller')
const { error } = require('../util/response')
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')


var serve = serveStatic('C:/Users/SepehrCommer/Desktop/todoProject/todolist/todolist/server/public', { index: ['index.html'] })

const router = require('find-my-way')({
  defaultRoute: (request, response) => {
    serve(request, response, finalhandler(request, response))
  }
})



router.get('/api/todo', getTodos)
router.get('/api/boardTodos/:boardId', getTodosByBoardId)
router.get('/api/todo/:todoId', getTodoById)
router.post('/api/todo', addTodo)
router.put('/api/todo/:todoId', updateTodo)
router.delete('/api/todo/:todoId', removeTodo)

router.get('/api/task', getTasks)
router.get('/api/task/:taskId', getTaskById)
router.get('/api/todoTasks/:todoId', getTasksByTodoId)
router.post('/api/task', addTask)
router.put('/api/task/:taskId', updateTask)
router.delete('/api/task/:taskId', removeTask)

router.get('/api/board', getBoards)
router.get('/api/board/:boardId', getBoardById)
router.post('/api/board', addBoard)
router.put('/api/board/:boardId', updateBoard)
router.delete('/api/board/:boardId', removeBoard)

exports.router = router
