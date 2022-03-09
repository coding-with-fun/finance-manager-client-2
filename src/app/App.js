import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import IndexRouter from "./routes/IndexRouter";

const App = () => {
    return (
        <BrowserRouter>
            <Box>
                <Navbar />

                <IndexRouter />
            </Box>
        </BrowserRouter>
    );
};

export default App;
