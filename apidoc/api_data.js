define({ "api": [
  {
    "type": "post",
    "url": "/api/board",
    "title": "create new board.",
    "name": "addBoard",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "board_name",
            "description": "<p>the name of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "complete",
            "description": "<p>check if board compeleted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>owner of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>members name of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "images",
            "description": "<p>members image of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "todos",
            "description": "<p>todos list of the board.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "acceptAddBoard",
            "description": "<p>&quot;board added successfully &quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/boards_controller.js",
    "groupTitle": "board"
  },
  {
    "type": "get",
    "url": "/api/board:boardId",
    "title": "Request  special board information",
    "name": "getBoardById",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>boards unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "board_name",
            "description": "<p>the name of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "complete",
            "description": "<p>check if board compeleted.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>owner of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>members name of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "images",
            "description": "<p>members image of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "todos",
            "description": "<p>todos list of the board.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError .</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorGetBoardById",
            "description": "<p>not founded.mismatch with existance boards.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/boards_controller.js",
    "groupTitle": "board"
  },
  {
    "type": "get",
    "url": "/api/board",
    "title": "Request board information",
    "name": "getBoards",
    "group": "board",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "board_name",
            "description": "<p>the name of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "complete",
            "description": "<p>check if board compeleted.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>owner of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>members name of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "images",
            "description": "<p>members image of the board.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "todos",
            "description": "<p>todos list of the board.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/boards_controller.js",
    "groupTitle": "board"
  },
  {
    "type": "delete",
    "url": "/api/board:boardId",
    "title": "deletespecialboard",
    "name": "removeBoard",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>boards unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "acceptRemoveBoard",
            "description": "<p>board removed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorRemoveBoard",
            "description": "<p>board not founded. remove failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/boards_controller.js",
    "groupTitle": "board"
  },
  {
    "type": "put",
    "url": "/api/board:boardId",
    "title": "update existing board",
    "name": "updateBoard",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>boards unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "board_name",
            "description": "<p>the name of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "complete",
            "description": "<p>check if board compeleted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>owner of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>members name of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "images",
            "description": "<p>members image of the board.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "todos",
            "description": "<p>todos list of the board.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "acceptUpdateBoard",
            "description": "<p>board updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorUpdateBoard",
            "description": "<p>board not founded. update failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/boards_controller.js",
    "groupTitle": "board"
  },
  {
    "type": "post",
    "url": "/api/task",
    "title": "create new task",
    "name": "addTask",
    "group": "task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>the id of the todo which task belongs to it.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "check",
            "description": "<p>true if task is done.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the text of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>the image of owner of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "acceptAddTask",
            "description": "<p>task added successfully.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/task-controller.js",
    "groupTitle": "task"
  },
  {
    "type": "get",
    "url": "/api/task:taskId",
    "title": "Request  special task information.",
    "name": "getTaskById",
    "group": "task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>task unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>the id of the todo which task belongs to it.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "check",
            "description": "<p>true if task is done.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the text of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>the image of owner of the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError .</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorGetTaskById",
            "description": "<p>task not founded. mismatch with existance tasks.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/task-controller.js",
    "groupTitle": "task"
  },
  {
    "type": "get",
    "url": "/api/task:todoId",
    "title": "Request  tasks information",
    "name": "getTasks",
    "group": "task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>todo unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>the id of the todo which task belongs to it.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "check",
            "description": "<p>true if task is done.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the text of the task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>the image of owner of the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorGetTasks",
            "description": "<p>task not founded. mismatch with todoId.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/task-controller.js",
    "groupTitle": "task"
  },
  {
    "type": "delete",
    "url": "/api/task:taskId",
    "title": "deleting special task",
    "name": "removeTask",
    "group": "task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>task unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "acceptRemoveTask",
            "description": "<p>task removed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorRemoveTask",
            "description": "<p>tasknot founded. remove failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/task-controller.js",
    "groupTitle": "task"
  },
  {
    "type": "put",
    "url": "/api/task:taskId",
    "title": "editing specialtask",
    "name": "updateTask",
    "group": "task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>task unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>the id of the todo which task belongs to it.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "check",
            "description": "<p>true if task is done.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the text of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>the image of owner of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "acceptUpdateTask",
            "description": "<p>task updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorUpdateTask",
            "description": "<p>task not founded. update failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/task-controller.js",
    "groupTitle": "task"
  },
  {
    "type": "post",
    "url": "/api/todo",
    "title": "create new todo",
    "name": "addTodo",
    "group": "todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>the id of the board which todo belongs to it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>the title of the todo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>the tasks of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "acceptAddTodo",
            "description": "<p>todo added successfully.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/todo-controller.js",
    "groupTitle": "todo"
  },
  {
    "type": "get",
    "url": "/api/todo:todoId",
    "title": "Request  special todo information.",
    "name": "getTodoById",
    "group": "todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>todo unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>the id of the board which todo belongs to it.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>the title of the todo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>the tasks of todo.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError .</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorGetTodoById",
            "description": "<p>todo not founded. mismatch with existance todos.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/todo-controller.js",
    "groupTitle": "todo"
  },
  {
    "type": "get",
    "url": "/api/todo:boardId",
    "title": "Request  todos information",
    "name": "getTodos",
    "group": "todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>boards unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>the id of the board which todo belongs to it.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>the title of the todo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>the tasks of todo.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorGetTodos",
            "description": "<p>todo not founded. mismatch with boardId.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/todo-controller.js",
    "groupTitle": "todo"
  },
  {
    "type": "delete",
    "url": "/api/todo:todoId",
    "title": "deleting special todo",
    "name": "removeTodo",
    "group": "todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>todo unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "acceptRemoveTodo",
            "description": "<p>todo removed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorRemoveTodo",
            "description": "<p>todonot founded. remove failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/todo-controller.js",
    "groupTitle": "todo"
  },
  {
    "type": "put",
    "url": "/api/todo:todoId",
    "title": "editing specialtodo",
    "name": "updateTodo",
    "group": "todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>todo unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>the id of the board which todo belongs to it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>the title of the todo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>the tasks of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "acceptUpdateTodo",
            "description": "<p>todo updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "validatonError",
            "description": "<p>validatonError.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "errorUpdateTodo",
            "description": "<p>todo not founded. update failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/controller/todo-controller.js",
    "groupTitle": "todo"
  }
] });
