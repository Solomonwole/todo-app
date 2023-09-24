import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function TodoCards({ color, icon, text, number, onClick }) {
  return (
    <>
      <Box
        sx={{
          background: color,
          borderRadius: "8px",
          height: "100px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            background: "#fff",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{text}</Typography>
          <Typography sx={{ fontSize: "18px" }}>{number}</Typography>
        </Stack>
      </Box>
    </>
  );
}

export default TodoCards;
