import EditIcon from '@material-ui/icons/Edit';
import { EditTodoDialog } from './EditTodoDialog';
import { useSelector, useDispatch } from 'react-redux';
import todosSlice, {
  selectTodos,
  selectText,
  selectEditedTodoId,
  selectUpdatedText,
} from '../store/todosSlice';

export const EditTodoButton = ({ id, word }) => {
  const todos = useSelector(selectTodos);
  const text = useSelector(selectText);
  const edit = useSelector(selectEditedTodoId);
  const dispatch = useDispatch();

  //Handlers
  const handleClickOpen = (id) => {
    dispatch(todosSlice.actions.editTodoId(id));
    dispatch(todosSlice.actions.editOpenAndClose(true));
  };

  const handleClickClose = () => {
    dispatch(todosSlice.actions.editTodoId(undefined));
    dispatch(todosSlice.actions.editOpenAndClose(false));
  };

  const editItemHandler = (word) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === edit) {
        return { ...todo, word };
      }
      return todo;
    });

    dispatch(todosSlice.actions.editItem(updatedTodos));
  };

  return (
    <div>
      <EditIcon color="secondary" onClick={() => handleClickOpen(id)} />
      <EditTodoDialog onClose={handleClickClose} onEdit={editItemHandler} />
    </div>
  );
};
