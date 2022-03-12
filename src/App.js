import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import IndexRouter from "./utils/router/IndexRouter";

const App = () => {
    return (
        <BrowserRouter>
            <Box>
                <IndexRouter />
            </Box>
        </BrowserRouter>
    );
};

export default App;
