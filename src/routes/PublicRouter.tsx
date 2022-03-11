import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouterProps {
    children: JSX.Element;
}

const PublicRouter = (props: PublicRouterProps) => {
    const isVerified = Boolean(localStorage.getItem("token"));

    if (isVerified) {
        return <Navigate to="/" replace />;
    }

    return props.children;
};

export default PublicRouter;
