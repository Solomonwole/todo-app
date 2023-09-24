import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../mui/theme";
import UserAvatar from "../avartar/Avatar";
import InputField from "../InputField";

function Landing({ setApproved }) {
  const [userData, setUserData] = useState({
    username: "",
    gender: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Capitalize the first letter of the username
    if (name === "username") {
      const capitalizedUsername =
        value.charAt(0).toUpperCase() + value.slice(1);
      setUserData((prev) => ({
        ...prev,
        [name]: capitalizedUsername,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, [name]: value })
    );
  };

  const handleForm = (e) => {
    e.preventDefault();
    localStorage.setItem("approved", true);
    setApproved(true);
  };

  return (
    <>
      <Box
        sx={{
          background: theme.palette.background.main,
          height: "100vh",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box pt={4} sx={{ position: "relative" }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <UserAvatar width="150px" height="150px" />
              <Typography variant="h1" align="center" mt={5}>
                My Todo List
              </Typography>

              <Box
                component="form"
                onSubmit={handleForm}
                sx={{
                  background: theme.palette.primary.main,
                  width: "100%",
                  position: "fixed",
                  bottom: 0,
                  pt: 5,
                  pb: 4,
                  borderRadius: "30px 30px 0 0 ",
                }}
              >
                <Container maxWidth="sm">
                  <Stack spacing={2}>
                    <Stack spacing={0.5}>
                      <Typography>Enter Username:</Typography>
                      <InputField
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        label="Username"
                      />
                    </Stack>
                    <Stack spacing={0.5}>
                      <Typography>Select Gender:</Typography>
                      <FormControl sx={{ background: "transparent" }}>
                        {userData.gender === "" ? (
                          <InputLabel
                            id="demo-simple-select-outlined-label"
                            shrink={userData.gender !== ""}
                          >
                            Gender
                          </InputLabel>
                        ) : null}
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={userData.gender}
                          name="gender"
                          onChange={handleChange}
                          sx={{
                            borderRadius: "10px",
                            background: "#EBEBEB",
                            border: "none",
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                          required
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <Button variant="contained" type="submit">
                      Continue
                    </Button>
                  </Stack>
                </Container>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
