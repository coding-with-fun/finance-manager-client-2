import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    Accounts,
    Dashboard,
    Home,
    Profile,
    SignIn,
    SignUp,
} from "../../pages";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const IndexRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRouter>
                        <Home />
                    </PublicRouter>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRouter>
                        <Dashboard />
                    </PrivateRouter>
                }
            />

            <Route
                path="/signin"
                element={
                    <PublicRouter>
                        <SignIn />
                    </PublicRouter>
                }
            />

            <Route
                path="/signup"
                element={
                    <PublicRouter>
                        <SignUp />
                    </PublicRouter>
                }
            />

            <Route
                path="/profile"
                element={
                    <PrivateRouter>
                        <Profile />
                    </PrivateRouter>
                }
            />

            <Route
                path="/accounts"
                element={
                    <PrivateRouter>
                        <Accounts />
                    </PrivateRouter>
                }
            />
        </Routes>
    );
};

export default IndexRouter;
