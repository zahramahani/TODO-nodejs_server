const dotenv = require('dotenv').config({
  path: './.env'
})
const env = dotenv.parsed
console.log(env)
const {
  Client
} = require('pg')

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  connectionString: process.env.PGURL,
  statement_timeout: process.env.PGTIMEOUT
}

exports.getBoards = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT * FROM "boards" WHERE "boardId"=($1)', [id])
      } else {
        query = client.query('SELECT * FROM "boards"')
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result.rows
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addBoard = (board) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`INSERT INTO "boards"("ownerId","done","name") 
                      VALUES ($1, $2, $3);`,
      // eslint-disable-next-line indent
          [board.ownerId, board.done, board.name])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.updateBoard = (id, board) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`UPDATE "boards" SET "ownerId" =($2),"done"=($3),"name" =($4)  WHERE "boardId"=($1) ;`,
        // eslint-disable-next-line indent
          [id, board.ownerId, board.done, board.name])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.removeBoard = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`DELETE FROM "boards" WHERE "boardId"=($1)`, [id])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getTodos = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT * FROM "todos" WHERE  "todoId"=($1)', [id])
      } else {
        query = client.query('SELECT * FROM "todos" ')
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getNumberofBoardsTodos = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT COUNT("boardId") FROM "todos" WHERE "boardId"=($1)', [id])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getBoardsTodos = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT * FROM "todos" WHERE  "boardId"=($1)', [id])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addTodo = (todo) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`INSERT INTO "todos"("boardId", "done", "name")
                      VALUES ($1, $2, $3);`,
      // eslint-disable-next-line indent
          [todo.boardId, todo.compelete, todo.title])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.updateTodo = (id, todo) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`UPDATE "todos" SET "boardId" =($2),done=($3),name =($4) WHERE "todoId"=($1);`,
        // eslint-disable-next-line indent
          [id, todo.boardId, todo.compelete, todo.title])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.removeTodo = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`DELETE FROM "todos" WHERE "todoId"=($1)`, [id])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getTasks = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT * FROM "tasks" WHERE "taskId" =($1)', [id])
      } else {
        query = client.query('SELECT * FROM "tasks"')
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getNumberofTodosTask = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT COUNT("todoId") FROM "tasks" WHERE "todoId"=($1)', [id])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getTodosTasks = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT * FROM "tasks" WHERE "todoId" =($1)', [id])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addTask = (task) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`INSERT INTO "tasks"("todoId","userId","done","text")
                      VALUES ($1, $2, $3, $4);`,
      // eslint-disable-next-line indent
          [task.todoId, task.userId, task.done, task.text])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.updateTask = (id, task) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`UPDATE "tasks" SET "todoId" =($2),"userId" =($3),"done"=($4),"text"=($5) WHERE "taskId"=($1);`,
        // eslint-disable-next-line indent
          [id, task.todoId, task.userId, task.done, task.text])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.removeTask = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`DELETE FROM "tasks" WHERE "taskId"=($1)`, [id])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
