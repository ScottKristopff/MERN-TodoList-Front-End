import {
  Dialog,
  TextField,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import todosSlice, {
  selectText,
  selectUpdatedText,
  selectEditOpen,
  selectTodos,
} from '../store/todosSlice';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '45ch',
  },
}));

export const EditTodoDialog = ({ onClose, onEdit }) => {
  //Selectors
  const text = useSelector(selectText);
  const todos = useSelector(selectTodos);
  const updatedText = useSelector(selectUpdatedText);
  const open = useSelector(selectEditOpen);
  const dispatch = useDispatch();
  const classes = useStyles();

  //Handlers
  const handleClose = () => {
    onClose();
    dispatch(todosSlice.actions.setUpdatedText(''));
  };

  const editChangeHandler = (e) => {
    dispatch(todosSlice.actions.setUpdatedText(e.target.value));
  };

  const handleEditButtonClick = () => {
    onEdit(updatedText);
    onClose();
    dispatch(todosSlice.actions.setUpdatedText(''));
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} keepMounted>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              onChange={editChangeHandler}
              value={updatedText}
              label="Input change here"
              color="secondary"
              className={classes.textField}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditButtonClick} color="secondary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
