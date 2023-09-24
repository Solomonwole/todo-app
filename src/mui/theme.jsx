import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      light: "#0373FD",
      dark: "#2D3958",
    },
    background: {
      main: "#12022F",
    },
    info: {
      main: "#F6F7F8",
    },
    textPrimary: {
      main: "#7B88A8",
    },
    textSecondary: {
      main: "#666a6c",
    },
    notify: {
      main: "#5b1919",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    h1: {
      fontSize: "72px",
      color: "#FFFFFF",
      fontWeight: 800,
      "@media (max-width: 600px)": {
        fontSize: "42px",
      },
    },
    h2: {
      fontSize: "30px",
      color: "#2D3958",
      fontWeight: 600,
      "@media (max-width: 600px)": {
        fontSize: "25px",
      },
    },
    h3: {
      fontSize: "22px",
      color: "#2D3958",
      fontWeight: 400,
    },
    h4: {
      fontSize: "16px",
      color: "#2D3958",
    },
    h5: {
      fontSize: "14px",
      color: "#FFFFFF",
    },
    body1: {
      fontSize: "14px",
      color: "#7B88A8",
    },
    caption: {
      fontSize: "12px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          minWidth: "90px",
          minHeight: "50px",
        },
        contained: {
          boxShadow: "none",
          background: "#12022F",
          color: "#fff",
          "&:hover": {
            boxShadow: "none",
            background: "#12022F",
            color: "#fff",
          },
        },
      },
    },
  },
});

export default theme;
