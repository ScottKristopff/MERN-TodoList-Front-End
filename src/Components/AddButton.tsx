import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  addbutton: {
    marginTop: '12px',
    marginLeft: '25px',
    marginRight: '25px',
    marginBottom: '5px',
    padding: '10px 60px',
  },
});

export const AddButton = ({ onClick }) => {
  const classes = useStyles();

  /* 
  //Handler
  const handleNewTodoClick = () => {
    dispatch(todosSlice.actions.handleAddTodo(text));
  }; */

  return (
    <Button
      className={classes.addbutton}
      onClick={onClick}
      variant="contained"
      color="secondary"
      disableElevation
    >
      <Typography variant="button">Add</Typography>
    </Button>
  );
};
