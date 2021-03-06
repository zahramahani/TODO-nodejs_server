/* eslint-disable node/no-deprecated-api */
const { getNumberOfTodosDoneTask, getNumberOfTodos, getTodos, getTodoById, addTodo, updateTodo, removeTodo } = require('../controller/todo-controller')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard } = require('../controller/boards_controller')
const { getNumberOfAllTasks, getNumberOfTasks, getTasks, getTaskById, addTask, updateTask, removeTask } = require('../controller/task-controller')
const { signUp, login, getUserName, deleteUserFromBoard, addUserToBoard, getuserIdByUserName, getUser, getUserRepeted } = require('../controller/user-controller')
const { removeOwner, getBoardHasUser } = require('../controller/boards_users_controller')
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')
var serve = serveStatic('public/', { index: ['index.html'], fallthrough: false })

const router = require('find-my-way')({
  defaultRoute: (request, response, params) => {
    serve(request, response, () => {
      request.url = 'index.html'
      serve(request, response, finalhandler(request, response))
    })
  }
})

router.get('/api/doneTasks', getNumberOfTodosDoneTask)

router.get('/api/userName', getUserName)
router.delete('/api/deleteMemberFromBoard/:boardId-:userId', deleteUserFromBoard)
router.post('/api/addMemberToBoard', addUserToBoard)

router.get('/api/getBoardHasUser', getBoardHasUser)
router.get('/api/getuserIdByUserName', getuserIdByUserName)
router.get('/api/getMember', getUser)
router.get('/api/getUserRepeated', getUserRepeted)
router.delete('/api/owner/:boardId', removeOwner)

router.get('/api/todo', getTodos)
router.get('/api/todoNumber', getNumberOfTodos)
router.get('/api/todo/:todoId', getTodoById)
router.post('/api/todo', addTodo)
router.put('/api/todo/:todoId', updateTodo)
router.delete('/api/todo/:todoId', removeTodo)

router.get('/api/task', getTasks)
router.get('/api/allTaskNumber', getNumberOfAllTasks)
router.get('/api/taskNumber', getNumberOfTasks)
router.get('/api/task/:taskId', getTaskById)
router.post('/api/task', addTask)
router.put('/api/task/:taskId', updateTask)
router.delete('/api/task/:taskId', removeTask)

router.get('/api/board', getBoards)
router.get('/api/board/:boardId', getBoardById)
router.post('/api/board', addBoard)
router.put('/api/board/:boardId', updateBoard)
router.delete('/api/board/:boardId', removeBoard)

router.post('/api/signup', signUp)
router.post('/api/login', login)
exports.router = router
