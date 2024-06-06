import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  Grow,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { saveLocal } from "./utils/features";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([
    { title: "dsfg", isCompleted: false, id: "adsfgh" },
    { title: "ewrtyuj", isCompleted: false, id: "refgbn" },
  ]);

  const [title, setTitle] = useState<TodoItemType["title"]>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const itemsPerPage = 5;

  const CompleteHandler = (id: TodoItemType["id"]): void => {
    const todo = todos.find((i) => i.id === id);
    if (todo) {
      setSnackbarMessage(`Task "${todo.title}" has been completed and removed.`);
      setSnackbarOpen(true);
    }
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (id: TodoItemType["id"], newTitle: TodoItemType["title"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 1000)),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveLocal(todos);
  }, [todos]);

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const pageCount = Math.ceil(todos.length / itemsPerPage);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack
        height={"fit-content"}
        direction={"column"}
        spacing={"1rem"}
        p={"1rem"}
      >
        {currentTodos.map((i) => (
          <Grow in={true} key={i.id}>
            <div>
              <TodoItem
                deleteHandler={deleteHandler}
                CompleteHandler={CompleteHandler}
                editHandler={editHandler}
                todo={i}
              />
            </div>
          </Grow>
        ))}
      </Stack>
      <TextField
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") {
            submitHandler();
          }
        }}
      />
      <Button
        onClick={submitHandler}
        sx={{
          margin: "1rem 0",
          padding: "0.5rem",
        }}
        fullWidth
        variant="contained"
        disabled={title === ""}
      >
        Add
      </Button>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: "1rem" }}
      >
        <IconButton
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          <ArrowBack />
        </IconButton>
        <Typography>
          Page {currentPage} of {pageCount}
        </Typography>
        <IconButton
          onClick={() => handlePageChange('next')}
          disabled={currentPage === pageCount}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;


