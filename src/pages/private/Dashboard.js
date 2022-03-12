import { Container, Typography } from "@mui/material";
import _ from "lodash";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const Dashboard = () => {
    const { userData } = useContext(UserDataContext);

    return (
        <Container maxWidth="sm">
            <Typography>Hello {_.get(userData, "firstName")}</Typography>
            <Link to="/profile">User Profile</Link>
        </Container>
    );
};

export default Dashboard;
