const { Router } = require('express')

const { getTodos, postTodos } = require('./controllers/todos')

const router = Router()

router.get('/todos', getTodos)

router.post('/todos', postTodos)

module.exports = router
