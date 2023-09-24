import { ThemeProvider } from "@mui/material";
import theme from "./mui/theme";
import HomePage from "./screen/HomePage";
import Landing from "./components/landing/Landing";
import { useEffect, useState } from "react";
function App() {
  const approvedBool = localStorage.getItem("approved");

  const [approved, setApproved] = useState(true);

  useEffect(() => {
    if (approvedBool) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  }, [approvedBool]);
  return (
    <>
      <ThemeProvider theme={theme}>
        {approved ? <HomePage /> : <Landing setApproved={setApproved} />}
      </ThemeProvider>
    </>
  );
}

export default App;
