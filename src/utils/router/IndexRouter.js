import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "../../pages";
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
        </Routes>
    );
};

export default IndexRouter;
