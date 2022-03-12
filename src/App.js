import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import IndexRouter from "./utils/router/IndexRouter";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />

            <Box>
                <IndexRouter />
            </Box>
        </BrowserRouter>
    );
};

export default App;
