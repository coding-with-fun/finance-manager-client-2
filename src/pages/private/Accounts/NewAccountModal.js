import {
    Backdrop,
    Box,
    Button,
    Fade,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import _ from "lodash";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AddTransactionSource_API } from "../../../api/TransactionSource.api";
import { ValidateNumber } from "../../../utils/HandleValidation";

const modalWrapperStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    backgroundColor: "#fff",
    border: 0,
    p: 4,
};

const NewAccountModal = ({ open, handleClose }) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            balance: "0",
        },
    });

    const handleAddTransactionSource = (data) => {
        reset();
        handleClose();
    };

    const { mutate: addTransactionSourceMutation, isLoading } = useMutation(
        AddTransactionSource_API,
        {
            onSuccess: handleAddTransactionSource,
        }
    );

    const onSubmit = (body) => {
        const data = {
            ...body,
            balance: parseFloat(body.balance),
        };
        addTransactionSourceMutation(data);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={modalWrapperStyles}>
                    <Typography variant="h5" component="div">
                        Add new account
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                            gap: "1rem",
                            mt: 3,
                        }}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Account name is required.",
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Account name"
                                    autoComplete="account-name"
                                    error={_.has(errors, "name")}
                                    helperText={_.get(errors, "name.message")}
                                    disabled={isLoading}
                                />
                            )}
                        />

                        <Controller
                            name="balance"
                            control={control}
                            rules={{
                                required: "Account balance is required.",
                                min: {
                                    value: 0,
                                    message:
                                        "Account balance should be more than 0.",
                                },
                                validate: (balance) =>
                                    ValidateNumber(balance) ||
                                    "Account balance should be a number",
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Account balance"
                                    autoComplete="account-balance"
                                    error={_.has(errors, "balance")}
                                    helperText={_.get(
                                        errors,
                                        "balance.message"
                                    )}
                                    disabled={isLoading}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={
                                _.has(errors, "name") ||
                                _.has(errors, "balance") ||
                                isLoading
                            }
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default NewAccountModal;
