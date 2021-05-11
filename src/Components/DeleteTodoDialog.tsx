import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import todosSlice, { selectTodos, selectOpen } from '../store/todosSlice'

export const DeleteTodoDialog = ({ id }) => {
    const todos = useSelector(selectTodos)
    const open = useSelector(selectOpen)
    const dispatch = useDispatch()

    const handleDeleteButtonClose = () => {
        dispatch(todosSlice.actions.deleteOpenAndClose(false))
    }

    //Todo change to todo.id !== todo.id
    //! When the add button is hit the dialog box is immediately open
    const handleDeleteTodoItem = (id) => {
        const updatedTodos = todos.filter((todo) => {
            return todo.id !== id
        })
        dispatch(todosSlice.actions.deleteTodoItem(updatedTodos))
        handleDeleteButtonClose()
    }

    const selectedTodo = todos.find((todo) => todo.id === id)

    if (!selectedTodo) {
        return null
    }

    const { word } = selectedTodo

    return (
        <Dialog open={open} onClose={handleDeleteButtonClose} keepMounted>
            <DialogTitle>Delete Todo</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete the todo: "{word}"
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleDeleteTodoItem(id)}
                    color="secondary"
                >
                    Confirm
                </Button>
                <Button color="secondary" onClick={handleDeleteButtonClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
