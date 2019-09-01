const dotenv = require('dotenv').config({
  path: './.env'
})
const env = dotenv.parsed
console.log(env)
const {
  Pool
} = require('pg')
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  connectionString: process.env.PGURL,
  statement_timeout: process.env.PGTIMEOUT
}
const pool = new Pool(config)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
exports.getBoards = (userName) => {
  let result
  let query
  if (userName) {
    query = pool.query(`SELECT "boards"."boardId","boards"."ownerId","boards"."name",boards.done FROM "users" , "boards" , "boards-users" WHERE "boards-users"."boardId" = "boards"."boardId" and "boards-users"."userId" = "users"."userId" and "users"."userName" = ($1) ORDER BY "boards"."boardId" ASC;`, [userName])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getBoardById = (id) => {
  let result
  let query
  if (id) {
    query = pool.query(`SELECT * FROM  "boards" WHERE "boards"."boardId" = ($1) ORDER BY "boards"."boardId" ASC;`, [id])
  }
  return query
    .then((res) => {
      result = res
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
  return pool.query(`INSERT INTO "boards"("ownerId","done","name") 
                      VALUES ($1, $2, $3) Returning "boardId"`,
  // eslint-disable-next-line indent
          [board.ownerId, board.done, board.name])
    .then((res) => {
      result = res
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
  return pool.query(`UPDATE "boards" SET "ownerId" =($2),"done"=($3),"name" =($4)  WHERE "boardId"=($1) ;`,
    // eslint-disable-next-line indent
          [id, board.ownerId, board.done, board.name])
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.removeBoardDb = (id) => {
  let result
  pool.query(`DELETE  FROM "boards-users" WHERE "boardId"=($1)`, [id])
  pool.query(`DELETE  FROM "todos" WHERE "todos"."boardId"=($1)`, [id])
  return pool.query('DELETE FROM "boards" WHERE "boardId"=($1)', [id])
    .then((res) => {
      result = res
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
  let query
  if (id) {
    query = pool.query('SELECT * FROM "todos" WHERE  "todoId"=($1) ', [id])
  } else {
    query = pool.query('SELECT * FROM "todos" ORDER BY "todoId" ASC ') // changed
  }
  return query
    .then((res) => {
      result = res
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
  let query
  if (id) {
    query = pool.query('SELECT COUNT("boardId") FROM "todos" WHERE "boardId"=($1)', [id])
  }
  return query
    .then((res) => {
      result = res
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
  let query
  if (id) {
    query = pool.query('SELECT * FROM "todos" WHERE  "boardId"=($1)', [id])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getTodosDoneTasks = (id) => {
  let result
  let query
  if (id) {
    query = pool.query('SELECT COUNT("taskId") FROM "tasks" WHERE"tasks"."done"= false  and "todoId"=($1)', [id])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addTodo = (todo) => {
  let result
  return pool.query(`INSERT INTO "todos"("boardId", "done", "name")
                      VALUES ($1, $2, $3);`,
  // eslint-disable-next-line indent
          [todo.boardId, todo.compelete, todo.title])
    .then((res) => {
      result = res
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
  return pool.query(`UPDATE "todos" SET "boardId" =($2),done=($3),name =($4) WHERE "todoId"=($1);`,
    // eslint-disable-next-line indent
          [id, todo.boardId, todo.compelete, todo.title])
    .then((res) => {
      result = res
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
  pool.query(`DELETE  FROM "tasks" WHERE "tasks"."todoId"=($1)`, [id])
  return pool.query('DELETE FROM "todos" WHERE "todos"."todoId"=($1)', [id])
    .then((res) => {
      result = res
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
  let query
  if (id) {
    query = pool.query('SELECT * FROM "tasks" WHERE "taskId " =($1) ORDER BY "taskId" ASC', [id])
  } else {
    query = pool.query('SELECT * FROM "tasks" ORDER BY "taskId" ASC') // changed
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getNumberofAllTodosTask = (id) => {
  let result
  let query
  if (id) {
    query = pool.query('SELECT COUNT("taskId") FROM "tasks","todos" WHERE"todos"."todoId"="tasks"."todoId" and "boardId"=($1)', [id])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getNumberofTodosTask = (id) => {
  let result
  let query
  if (id) {
    query = pool.query('SELECT COUNT("taskId") FROM "tasks","todos" WHERE"todos"."todoId"="tasks"."todoId" and "boardId"=($1) and "tasks"."done"=false', [id])
  }
  return query
    .then((res) => {
      result = res
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
  let query
  if (id) {
    query = pool.query('SELECT * FROM "tasks" WHERE "todoId" =($1)  ORDER BY "taskId" ASC', [id])
  }
  return query
    .then((res) => {
      result = res
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
  return pool.query(`INSERT INTO "tasks"("todoId","userId","done","text")
                      VALUES ($1, $2, $3, $4);`,
  // eslint-disable-next-line indent
          [task.todoId, task.userId, task.done, task.text])
    .then((res) => {
      result = res
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
  return pool.query(`UPDATE "tasks" SET "todoId" =($2),"userId" =($3),"done"=($4),"text"=($5) WHERE "taskId"=($1);`,
    // eslint-disable-next-line indent
          [id, task.todoId, task.userId, task.done, task.text])
    .then((res) => {
      result = res
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
  return pool.query(`DELETE FROM "tasks" WHERE "taskId"=($1)`, [id])
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getUserDb = (boardId) => {
  // boardId = Number(boardId)
  let result
  let query
  if (boardId) {
    query = pool.query(`SELECT "userName" FROM "users" , "boards" , "boards-users" WHERE "boards-users"."boardId" = "boards"."boardId" and "boards-users"."userId" = "users"."userId" and "boards"."boardId"=($1) ORDER BY "users"."userId" ASC`, [boardId])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getBoardHasUserDb = (userId) => {
  let result
  let query
  if (userId) {
    query = pool.query('SELECT COUNT("userId") FROM "users" WHERE "userId"=($1)', [userId])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getUserRepeatedDb = (userName) => {
  let result
  let query
  if (userName) {
    query = pool.query('SELECT COUNT("userName") FROM "users" WHERE "userName"=($1)', [userName])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.postUser = (firstName, lastName, boardId) => {
  let result
  return pool.query(`INSERT INTO "users"("firstName","lastName")
                      VALUES ($1, $2); ORDER BY "taskId" ASC`, [firstName, lastName])
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getUserNameDb = (id) => {
  let result
  let query
  if (id) {
    query = pool.query('SELECT "userName" FROM "users" WHERE "userId" =($1)', [id])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows[0].userName
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.postOwnerDb = (body) => {
  let result
  return pool.query(`INSERT INTO "boards-users"("boardId","userId") VALUES ($1, $2)`,
    [body.boardId, body.userId])
  // INSERT INTO "boards-users" ("boardId","userId") VALUES ($1, $2) WHERE "userName" NOTIN (SELECT "UserName" FROM "boards-users")
  // eslint-disable-next-line indent
    // })
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.deleteUserDb = (temp) => {
  let result

  return pool.query('DELETE FROM "boards-users" WHERE "boardId"=($1) and "userId"=($2)', [temp.boardId, temp.userId])
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getUserIdDb = (userName) => {
  const searchUserName = '' + userName
  let result
  let query
  if (userName) {
    query = pool.query('SELECT "userId" FROM "users" WHERE "userName" =($1)', [searchUserName])
  }
  return query
    .then((res) => {
      result = res
    })
    .then((res) => {
      return result.rows[0].userId
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addAuthUser = (user) => {
  return pool.query(`INSERT INTO users("firstName","lastName","userName", "passwordHash", "salt") 
                    VALUES ($1, $2, $3,$4,$5);`,
  // eslint-disable-next-line indent
    [user.firstName, user.lastName, user.userName, user.passwordHash, user.salt])
    .then((result) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getAuthUser = (username) => {
  let query
  if (username) {
    query = pool.query('SELECT * FROM users WHERE "userName"=($1)', [username])
  } else {
    query = pool.query('SELECT * FROM users')
  }
  return query
    .then((result) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
// to avoid repetitive boardName
exports.hasBoard = (name) => {
  console.log(name)
  let query
  if (name) {
    query = pool.query('SELECT COUNT("name") FROM "boards" GROUP BY "name"=($1)', [name])
  }
  // debugger
  return query
    .then((result) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.BoardByUserName = (userName) => {
  console.log(name)
  let query
  if (name) {
    query = pool.query(`SELECT "boards"."boardId","boards"."ownerId","boards"."name",boards.done FROM "users" , "boards" , "boards-users" WHERE "boards-users"."boardId" = "boards"."boardId" and "boards-users"."userId" = "users"."userId" and "users"."userName" = ($1) ORDER BY "boards"."boardId" ASC`, [userName])
  }
  // debugger
  return query
    .then((result) => {
      return result.rows[0].count
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
