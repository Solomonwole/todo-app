import React, { useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { BsFillCheckCircleFill, BsFillClockFill } from "react-icons/bs";
import { FaCalendarAlt, FaRegCircle } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import theme from "../../mui/theme";
import empty from "../../assets/empty.svg";
import nodata from "../../assets/nodata.svg";

function formatRelativeDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  }
}

function TodoList({ todoList, setTodoList, cardState }) {
  const [expandedTodoId, setExpandedTodoId] = useState(null);
  const allTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

  const deleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const toggleDescription = (id) => {
    if (expandedTodoId === id) {
      // If the same todo is clicked again, hide its description
      setExpandedTodoId(null);
    } else {
      // Otherwise, show the clicked todo's description
      setExpandedTodoId(id);
    }
  };

  const toggleDone = (id) => {
    const today = new Date().toISOString().split("T")[0];
    const allTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
    let updatedTodoList = [];

    if (cardState === 0) {
      // Today
      updatedTodoList = allTodoList
        .filter((todo) => todo.date === today)
        .map((todo) => {
          if (todo.id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
    } else if (cardState === 1) {
      // All
      updatedTodoList = allTodoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    } else if (cardState === 2) {
      // Done
      updatedTodoList = allTodoList
        .filter((todo) => todo.done)
        .map((todo) => {
          if (todo.id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
    } else if (cardState === 3) {
      // Pending
      updatedTodoList = allTodoList
        .filter((todo) => !todo.done)
        .map((todo) => {
          if (todo.id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
    } else {
      updatedTodoList = [...todoList];
    }

    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const memoizedTodoList = useMemo(() => [...todoList].reverse(), [todoList]);

  return (
    <>
      {allTodoList.length > 0 ? (
        <Box>
          {memoizedTodoList.length > 0 ? (
            <ul style={style.ul}>
              {memoizedTodoList.map((todo) => (
                <li key={todo.id}>
                  <Box style={style.li}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <FormControlLabel
                          style={style.checkbox}
                          control={
                            <Checkbox
                              icon={<FaRegCircle color="#a3bbff" size={20} />}
                              checkedIcon={
                                <BsFillCheckCircleFill
                                  color={theme.palette.background.main}
                                  size={20}
                                />
                              }
                              checked={todo.done}
                              onChange={() => toggleDone(todo.id)}
                            />
                          }
                        />

                        <Stack onClick={() => toggleDescription(todo.id)}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <FaCalendarAlt
                                color={theme.palette.textPrimary.main}
                              />
                              <Typography>
                                {formatRelativeDate(new Date(todo.date))}
                              </Typography>
                            </Stack>

                            {todo.time && (
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <BsFillClockFill
                                  color={theme.palette.textPrimary.main}
                                />
                                <Typography>{todo.time}</Typography>
                              </Stack>
                            )}
                          </Stack>

                          <Typography variant="h4" mt={2}>
                            {todo.title}
                          </Typography>

                          {expandedTodoId === todo.id && (
                            <Typography variant="body1" mt={2}>
                              {todo.description}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>

                      <IconButton
                        sx={{ background: theme.palette.primary.main }}
                        onClick={() => deleteTodo(todo.id)}
                        color="background"
                      >
                        <FcFullTrash />
                      </IconButton>
                    </Stack>
                  </Box>
                </li>
              ))}
            </ul>
          ) : (
            <Box
              mt={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack spacing={3}>
                <img src={nodata} alt="" style={{ width: "150px" }} />
                <Typography align="center">Todo List is Empty</Typography>
              </Stack>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          mt={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <img src={empty} alt="" style={{ width: "150px" }} />
            <Typography align="center">Create a Todo List Today</Typography>
          </Stack>
        </Box>
      )}
    </>
  );
}

const style = {
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  li: {
    background: "#F4F7FF",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  checkbox: {
    background: "#fff",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default TodoList;
