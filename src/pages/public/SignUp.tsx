import _ from "lodash";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface IUserDataSchema {
    email: String;
    password: String;
}

const initialUserData = {
    email: "",
    password: "",
};

const SignUp = () => {
    const [userData, setUserData] =
        useState<Partial<IUserDataSchema>>(initialUserData);

    const handleUserDataChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setUserData((prevUserData) => {
            return {
                ...prevUserData,
                [_.get(e, "target.id")]: _.get(e, "target.value"),
            };
        });
    };

    const handleUserSignUp = () => {
        console.log(userData);
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexFlow: "column",
                mt: "2rem",
            }}
        >
            <Typography
                variant="h4"
                component="div"
                sx={{
                    textAlign: "center",
                    mb: "2rem",
                }}
            >
                Sign Up
            </Typography>

            <Box
                noValidate
                component="form"
                onSubmit={handleUserSignUp}
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    gap: "1rem",
                }}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    autoComplete="fi-plan-email"
                    type="email"
                    id="email"
                    value={userData.email}
                    onChange={(e) => handleUserDataChange(e)}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    autoComplete="fi-plan-password"
                    type="password"
                    id="password"
                    value={userData.password}
                    onChange={(e) => handleUserDataChange(e)}
                />

                <Button variant="outlined" onClick={handleUserSignUp}>
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
};

export default SignUp;
