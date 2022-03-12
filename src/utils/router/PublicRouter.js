import React from "react";
import { Navigate } from "react-router-dom";
import { GetUserToken } from "../HandleUserToken";

const PublicRouter = ({ children }) => {
    const userToken = GetUserToken();

    if (userToken) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRouter;
