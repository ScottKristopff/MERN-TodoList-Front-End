import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import todosSlice, {
    selectText,
    selectTodos,
    postTodos,
} from './store/todosSlice'
import { TodoList } from './Components/TodoList'
import { AddButton } from './Components/AddButton'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

//TODO: The edit and delete button are not working properly
//TODO: The app is having a hard time getting hold of the id: uuidv4().
//TODO: The app needs the id in order to manipulate the string held within the word key/value pair

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '38ch',
    },
}))

export const TodoApp = () => {
    const classes = useStyles()
    const text = useSelector(selectText)
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()

    const handleTextChange = (e) => {
        dispatch(todosSlice.actions.changeText(e.target.value))
    }

    //Add #3
    const handleNewTodoClick = () => {
        const newTodo = {
            id: uuidv4(),
            word: text,
            complete: false,
        }
        dispatch(todosSlice.actions.handleAddTodo(newTodo))
        // We already send todos when you add a new todo item
        // but probably without the added one
        dispatch(postTodos([...todos, newTodo]))
    }

    const completeCheckBoxHandler = (id) => {
        dispatch(
            todosSlice.actions.completeCheckBox(
                todos.map((item) => {
                    if (item.id !== id) {
                        return item
                    }
                    return {
                        ...item,
                        complete: !item.complete,
                    }
                }),
            ),
        )
    }

    console.log(text, todos, dispatch)

    //Enter Keydown Handler
    const handleEnterKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleNewTodoClick()
        }
    }

    //Todo: I need to switch the setTodos with action.payload and a function. Or something else

    //CheckBoxHandler

    // [{id: ..., word: ...}, {id: ..., word: ...}]
    return (
        <div>
            <TextField
                onChange={handleTextChange}
                value={text}
                onKeyDown={handleEnterKeyDown}
                className={classes.textField}
                color="secondary"
                label="Add Todo"
            />
            <AddButton onClick={handleNewTodoClick} />
            <TodoList onComplete={completeCheckBoxHandler} />
        </div>
    )
}

// Todos.map
/*   {
    todos.map((todo) => {
      return <div key={todo.id}>{todo.word}</div>;
    });
  } */
