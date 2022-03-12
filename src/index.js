import { ReactQueryDevtools } from "react-query/devtools";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";

const theme = createTheme({
    typography: {
        fontFamily: `"Poppins", sans-serif`,
    },
});

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,

    document.getElementById("root")
);
