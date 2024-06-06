import {
    Delete,
    Edit
} from "@mui/icons-material";
import {
    Checkbox,
    IconButton,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { useState } from "react";

type TodoItemType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  CompleteHandler: (id: TodoItemType["id"]) => void;
  editHandler: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void;
};

const TodoItem = ({ todo, CompleteHandler, deleteHandler, editHandler }: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  const handleEditClick = () => {
    setEditActive(!editActive);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && textVal !== "") {
      editHandler(todo.id, textVal);
      setEditActive(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "0.5rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField 
            value={textVal} 
            onChange={(e) => setTextVal(e.target.value)} 
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => CompleteHandler(todo.id)}
        />
        <Tooltip title="Edit">
          <IconButton color="primary" onClick={handleEditClick}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteHandler(todo.id)} color="primary">
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
