import {
  Box,
  Chip,
  Container,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import UserAvatar from "../components/avartar/Avatar";
import TodoCards from "../components/cards/Cards";
import { BiTimeFive } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import { BsCheckLg, BsHourglassSplit, BsPlusLg } from "react-icons/bs";
import AddTodo from "../components/modal/AddTodo";
import theme from "../mui/theme";
import TodoList from "../components/todoList/TodoList";
import { IoFilterSharp } from "react-icons/io5";

function HomePage() {
  const userDataString = localStorage.getItem("user");
  const user = userDataString ? JSON.parse(userDataString) : null;

  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState([]);
  const [listTitle, setListTitle] = React.useState("All Todo List");
  const [cardState, setCardState] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openBool = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateTodoList = (newTodoList) => {
    setTodoList(newTodoList);
  };

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodoList(storedTodoList);
  }, [setTodoList]);

  const memoizedTodoList = useMemo(() => [...todoList].reverse(), [todoList]);

  const newToday = new Date().toISOString().split("T")[0];

  // Filter the todoList to only include tasks with today's date
  const allTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const todayTodoList = allTodoList.filter((todo) => todo.date === newToday);
  const doneTodoList = allTodoList.filter((todo) => todo.done === true);
  const pendingTodoList = allTodoList.filter((todo) => todo.done === false);

  const today = new Date().toISOString().split("T")[0];
  const doneCount = allTodoList.filter((todo) => todo.done).length;
  const pendingCount = allTodoList.filter((todo) => !todo.done).length;

  const handleDelete = () => {
    localStorage.removeItem("todoList");
    setTodoList([]);
  };
  return (
    <>
      <Container maxWidth="md">
        <Box pt={2} pb={4}>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={0.5}>
                {user && user.username && (
                  <Typography variant="h3">Hello {user.username},</Typography>
                )}
                <Typography variant="body1">Let's get work started!</Typography>
              </Stack>

              <UserAvatar />
            </Stack>

            <Box
              mt={3}
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TodoCards
                color="#B4C4FE"
                icon={<BiTimeFive color="#B4C4FE" size={20} />}
                text="Today"
                number={
                  allTodoList.filter((todo) => todo.date === today).length
                }
                onClick={() => {
                  setListTitle("Things to do Today");
                  setTodoList(todayTodoList);
                  setCardState(0);
                }}
              />
              <TodoCards
                color="#FFC0F5"
                icon={<RiHistoryLine color="#FFC0F5" size={20} />}
                text="All"
                number={allTodoList.length}
                onClick={() => {
                  setListTitle("All Todo List");
                  setTodoList(allTodoList);
                  setCardState(1);
                }}
              />
              <TodoCards
                color="#CFF3E9"
                icon={<BsCheckLg color="#CFF3E9" size={20} />}
                text="Completed"
                number={doneCount}
                onClick={() => {
                  setListTitle("Completed");
                  setTodoList(doneTodoList);
                  setCardState(2);
                }}
              />

              <TodoCards
                color="#f5e74d"
                icon={<BsHourglassSplit color="#f5e74d" size={20} />}
                text="Pending"
                number={pendingCount}
                onClick={() => {
                  setListTitle("Pending Todo");
                  setTodoList(pendingTodoList);
                  setCardState(3);
                }}
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h2" mt={5} mb={3}>
                {listTitle}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2}>
                {memoizedTodoList.length > 2 && (
                  <Chip
                    label="Delete All"
                    variant="outlined"
                    onDelete={handleDelete}
                  />
                )}
                <IconButton
                  aria-controls={openBool ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openBool ? "true" : undefined}
                  onClick={handleClick}
                >
                  <IoFilterSharp />
                </IconButton>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openBool}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setListTitle("Things to do Today");
                      setTodoList(todayTodoList);
                      setCardState(0);
                      handleClose();
                    }}
                  >
                    Today's Task
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setListTitle("All Todo List");
                      setTodoList(allTodoList);
                      setCardState(1);
                      handleClose();
                    }}
                  >
                    All Task
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setListTitle("Completed");
                      setTodoList(doneTodoList);
                      setCardState(2);
                      handleClose();
                    }}
                  >
                    Completed Tasks
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setListTitle("Pending Todo");
                      setTodoList(pendingTodoList);
                      setCardState(3);
                      handleClose();
                    }}
                  >
                    Pending Tasks
                  </MenuItem>
                </Menu>
              </Stack>
            </Stack>

            <TodoList
              todoList={todoList}
              setTodoList={setTodoList}
              cardState={cardState}
              memoizedTodoList={memoizedTodoList}
            />

            <Fab
              color="background"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: "30px",
                right: { xs: "10px", md: "50px" },
                "&:hover": {
                  background: theme.palette.background.main,
                },
              }}
              onClick={() => setOpen(true)}
            >
              <BsPlusLg color="#fff" />
            </Fab>
          </Stack>
        </Box>
      </Container>

      <AddTodo open={open} setOpen={setOpen} updateTodoList={updateTodoList} />
    </>
  );
}

export default HomePage;
