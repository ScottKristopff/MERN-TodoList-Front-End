import { useSelector } from 'react-redux';
import todosSlice, { selectTodos } from '../store/todosSlice';
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import { TodoApp } from '../TodoApp';

const useStyles = makeStyles({
  cardHolder: {
    position: 'relative',
    maxHeight: '100vh',
    backgroundColor: '#F7F7F7',
  },
  cardContentHolder: {
    height: '450px',
    marginBottom: '2rem',
    overflow: 'auto',
  },
  cardHeader: {
    marginTop: '15px',
    marginBottom: '15px',
    marginLeft: '60px',
  },
  todoCompleteCountText: {
    marginBottom: '20px',
  },
});

export const TodoCard = () => {
  const {
    cardHolder,
    cardContentHolder,
    cardHeader,
    todoCompleteCountText,
  } = useStyles();

  //useSelector
  const todos = useSelector(selectTodos);

  //Count Text
  const todosCount = todos.length;
  const todosCompletedCount = todos.reduce((acc, todo) => {
    if (todo.complete) {
      acc++;
    }

    return acc;
  }, 0);
  const isTodoCardEmpty = todosCount === 0;

  return (
    <Card className={cardHolder}>
      <CardHeader
        className={cardHeader}
        title={<Typography variant="h1">Todo App</Typography>}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent className={cardContentHolder}>
        {isTodoCardEmpty ? (
          <Typography
            variant="body1"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Your todo list is currently empty
          </Typography>
        ) : (
          <Typography
            variant="body1"
            color="textPrimary"
            align="center"
            gutterBottom
            className={todoCompleteCountText}
          >
            You have {todosCompletedCount}/{todosCount} todos completed
          </Typography>
        )}

        <TodoApp />
      </CardContent>
    </Card>
  );
};

//State
/*  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]); */
