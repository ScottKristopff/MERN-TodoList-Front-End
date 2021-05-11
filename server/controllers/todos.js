const TodoTask = require('../models/TodoTask')

const getTodos = () => {
    TodoTask.find()
        .then((todos) => {
            res.status(200).json({ todos })
        })
        .catch((error) => {
            throw error
        })
}

/* const getTodos = async (req, res) => {
    try {
        const todos = await TodoTask.find()
        console.log('Todos: ', todos)
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
} */

const postTodos = async (req, res) => {
    const body = req.body
    // We want to exclude ids as Mongoose will create them
    try {
        const transformedTodos = body.todos.map((todo) => ({
            word: todo.word,
            complete: todo.complete,
        }))

        await TodoTask.insertMany(transformedTodos)
        const allTodos = await Todo.find()

        res.status(201).json({ message: 'Todos added', todos: allTodos })
    } catch (error) {
        throw error
    }
}

module.exports = { getTodos, postTodos }
