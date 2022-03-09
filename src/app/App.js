import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import IndexRouter from "./routes/IndexRouter";

const App = () => {
  return (
    <Box>
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </Box>
  );
};

export default App;
