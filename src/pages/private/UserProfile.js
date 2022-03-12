import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
    return (
        <Container maxWidth="sm">
            <Link to="/dashboard">Dashboard</Link>
        </Container>
    );
};

export default UserProfile;
