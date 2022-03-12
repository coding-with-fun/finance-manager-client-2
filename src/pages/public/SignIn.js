import { Box, Button, Container, TextField, Typography } from "@mui/material";
import _ from "lodash";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { UserSignIn_API } from "../../api/UserAuth.api";
import { ValidateEmail } from "../../utils/HandleValidation";

const SignIn = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleUserSignIn = (data) => {
        console.log("Signed In!", data);
    };

    const { mutate, isLoading } = useMutation(UserSignIn_API, {
        onSuccess: handleUserSignIn,
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                my: "2rem",
            }}
            maxWidth="sm"
        >
            <Typography
                component="div"
                variant="h4"
                sx={{
                    my: "1rem",
                }}
            >
                Sign In
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    width: "100%",
                    gap: "1rem",
                }}
            >
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required.",
                        validate: (value) =>
                            ValidateEmail(value) ||
                            "Please enter a valid email address.",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email"
                            autoComplete="email"
                            error={_.has(errors, "email")}
                            helperText={_.get(errors, "email.message")}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required.",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label="Password"
                            autoComplete="password"
                            error={_.has(errors, "password")}
                            helperText={_.get(errors, "password.message")}
                            disabled={isLoading}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="outlined"
                    disabled={
                        _.has(errors, "email") ||
                        _.has(errors, "password") ||
                        isLoading
                    }
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default SignIn;
