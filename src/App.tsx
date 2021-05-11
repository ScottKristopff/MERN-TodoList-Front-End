import { TodoCard } from './Components/TodoCard';
import { Container, Box } from '@material-ui/core';

export const App = () => {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box mt={10}>
          <TodoCard />
        </Box>
      </Container>
    </div>
  );
};

export default App;
