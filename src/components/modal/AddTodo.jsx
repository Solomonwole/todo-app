import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputField, {
  InputFieldDate,
  MultiField,
  TimeInputField,
} from "../InputField";
import { IoClose } from "react-icons/io5";

function AddTodo({ open, setOpen, updateTodoList }) {
  const handleClose = () => setOpen(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    done: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Retrieve the existing Todo list from localStorage or initialize an empty array
    const existingTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

    // Generate a unique ID for the new Todo item
    const newTodoId = Date.now(); // Using timestamp as a simple ID

    // Create the new Todo object with the generated ID
    const newTodo = {
      id: newTodoId, // Include the ID
      title: todo.title,
      description: todo.description,
      date: todo.date,
      time: todo.time,
      done: false,
    };

    // Add the new Todo to the list
    existingTodoList.push(newTodo);

    // Save the updated Todo list back to localStorage
    localStorage.setItem("todoList", JSON.stringify(existingTodoList));

    // Update the Todo list state in the parent component
    updateTodoList(existingTodoList);

    // Reset the form and close the modal
    setTodo({
      title: "",
      description: "",
      date: "",
      time: "",
    });

    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Todo
            </Typography>
            <IconButton onClick={handleClose}>
              <IoClose color="#000" />
            </IconButton>
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <Box component="form" mt={3} onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
              <InputField
                type="text"
                name="title"
                label="Todo Title"
                value={todo.title}
                onChange={handleInputChange}
              />
              <MultiField
                type="text"
                name="description"
                label="Todo Description"
                value={todo.description}
                onChange={handleInputChange}
              />
              <Stack direction="row" spacing={1}>
                <InputFieldDate
                  type="date"
                  name="date"
                  label="Date"
                  value={todo.date}
                  onChange={handleInputChange}
                />
                <TimeInputField
                  type="time"
                  name="time"
                  label="Time"
                  value={todo.time}
                  onChange={handleInputChange}
                />
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Todo
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddTodo;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", md: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
