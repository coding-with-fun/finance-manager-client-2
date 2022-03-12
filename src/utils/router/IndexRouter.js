import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "../../pages";
import PublicRouter from "./PublicRouter";

const IndexRouter = () => {
    return (
        <Routes>
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
        </Routes>
    );
};

export default IndexRouter;
