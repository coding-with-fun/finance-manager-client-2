import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserDataContext } from "./contexts/UserDataContext";
import { GetUserToken } from "./utils/HandleUserToken";
import IndexRouter from "./utils/router/IndexRouter";

const App = () => {
    const userToken = GetUserToken();

    const { setIsUserAuthenticated } = useContext(UserDataContext);

    useEffect(() => {
        setIsUserAuthenticated(Boolean(userToken));

        // eslint-disable-next-line
    }, [userToken]);

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
