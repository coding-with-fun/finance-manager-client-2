import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import _ from "lodash";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { UserSignUp_API } from "../../api/UserAuth.api";
import { ValidateEmail } from "../../utils/HandleValidation";
import { UserDataContext } from "../../contexts/UserDataContext";

const SignUp = () => {
    const { handleSetUserData } = useContext(UserDataContext);

    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmationPassword: "",
        },
    });

    const handleUserSignUp = (data) => {
        const { name, email, username } = _.get(data, "data.user");
        handleSetUserData(
            {
                name,
                email,
                username,
            },
            () => {
                navigate("/dashboard");
            }
        );
    };

    const { mutate: userSignUpMutation, isLoading } = useMutation(
        UserSignUp_API,
        {
            onSuccess: handleUserSignUp,
        }
    );

    const onSubmit = (data) => {
        userSignUpMutation(data);
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
                Sign Up
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
                    name="firstName"
                    control={control}
                    rules={{
                        required: "First name is required.",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="First Name"
                            autoComplete="firstName"
                            error={_.has(errors, "firstName")}
                            helperText={_.get(errors, "firstName.message")}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Last Name"
                            autoComplete="lastName"
                            error={_.has(errors, "lastName")}
                            helperText={_.get(errors, "lastName.message")}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: "Username is required.",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Username"
                            autoComplete="username"
                            error={_.has(errors, "username")}
                            helperText={_.get(errors, "username.message")}
                            disabled={isLoading}
                        />
                    )}
                />

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

                <Controller
                    name="confirmationPassword"
                    control={control}
                    rules={{
                        required: "Confirmation Password is required.",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label="Confirm Password"
                            autoComplete="confirmationPassword"
                            error={_.has(errors, "confirmationPassword")}
                            helperText={_.get(
                                errors,
                                "confirmationPassword.message"
                            )}
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
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
};

export default SignUp;
