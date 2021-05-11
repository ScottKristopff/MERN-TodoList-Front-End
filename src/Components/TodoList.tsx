import { useSelector, useDispatch } from 'react-redux'
import todosSlice, {
    selectText,
    selectTodos,
    fetchTodos,
    selectError,
    selectLoading,
} from '../store/todosSlice'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Alert } from '@material-ui/lab'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { DeleteTodoDialog } from './DeleteTodoDialog'
import { DeleteTodoButton } from './DeleteTodoButton'
import { EditTodoButton } from './EditTodoButton'
import {
    Checkbox,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    ListItemIcon,
    Button,
} from '@material-ui/core'
import { useEffect, useState } from 'react'

const useStyles = makeStyles({
    completed: {
        textDecoration: 'line-through',
        opacity: '0.5',
    },
})

export const TodoList = ({ onComplete }) => {
    const classes = useStyles()
    // Selectors
    const todos = useSelector(selectTodos)
    const text = useSelector(selectText)
    const error = useSelector(selectError)
    const isLoading = useSelector(selectLoading)
    const dispatch = useDispatch()
    const [selectedTodoId, setSelectedTodoId] = useState(undefined)

    useEffect(() => {
        // TODO: Add loading/error handling as well
        // We use axios.get to load all the todos we saved
        // on initial page load
        dispatch(fetchTodos())
    }, [])

    const handleDeleteButtonOpen = (id) => () => {
        setSelectedTodoId(id)
        dispatch(todosSlice.actions.deleteOpenAndClose(true))
    }

    //Error/Loading handling conditionals
    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    if (isLoading) {
        return (
            <Grid container justify="center">
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <Grid container>
            {todos.map((todo) => (
                <Grid item xs={12} key={todo.id}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                    checked={todo.complete}
                                    onChange={() => onComplete(todo.id)}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={todo.word}
                                className={`${
                                    todo.complete ? classes.completed : ' '
                                }`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <EditTodoButton
                                        id={todo.id}
                                        word={todo.word}
                                    />
                                </IconButton>
                                <IconButton>
                                    <DeleteRoundedIcon
                                        onClick={handleDeleteButtonOpen(
                                            todo.id,
                                        )}
                                        color="black"
                                    />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
            ))}
            <DeleteTodoDialog id={selectedTodoId} />
        </Grid>
    )
}
