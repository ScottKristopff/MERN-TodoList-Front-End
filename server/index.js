const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const todoRoutes = require('./routes')

// document in MongoDB = an object on the Frontend, Model is like represantion

// Todo Model
// {
// id: string
// word: string
// complete: boolean
// }
// Document_1_Todo
// {id: '23432423423432', word: 'Hlelo', complete: false}

dotenv.config()

app.use(express.json())
app.use(cors())
//To parse URL encoded Data
app.use(
    express.urlencoded({
        extended: true,
    }),
)
//view engine configuration
app.set('view engine', 'ejs')

app.use(todoRoutes)

// ORIGINAL LISTEN METHOD

/* app.listen(port, () => {
    console.log(`Todos Server running on: ${port}`)
})
 */ mongoose.set(
    'useFindAndModify',
    false,
)
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to db!')
        app.listen(3000, () =>
            console.log('Server Up and running on port 3000'),
        )
    },
)
