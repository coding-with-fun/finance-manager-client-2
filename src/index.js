import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { TransactionSourcesProvider } from "./contexts/TransactionSourcesContext";
import { UserDataProvider } from "./contexts/UserDataContext";
import "./index.css";

const theme = createTheme({
    typography: {
        fontFamily: `"Poppins", sans-serif`,
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <UserDataProvider>
            <TransactionSourcesProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover
                    theme="colored"
                />

                <ReactQueryDevtools initialIsOpen={false} />
            </TransactionSourcesProvider>
        </UserDataProvider>
    </QueryClientProvider>,

    document.getElementById("root")
);
