import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { AddTransactionSource_API } from "../../../api/TransactionSource.api";
import { TransactionSourcesContext } from "../../../contexts/TransactionSourcesContext";
import ValidateAccountDetails from "./ValidateAccountDetails";

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
    const { handleUpdateTransactionSources } = useContext(
        TransactionSourcesContext
    );

    const [accountDetails, setAccountDetails] = useState({
        name: "",
        balance: "0",
        type: "bank-account",
    });
    const [errors, setErrors] = useState({});

    const handleOnChange = (event) => {
        setAccountDetails((prevDetails) => {
            return {
                ...prevDetails,
                [event.target.name]: event.target.value,
            };
        });

        if (_.get(errors, event.target.name))
            setErrors((prevErrors) => {
                return _.omit(prevErrors, event.target.name);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = ValidateAccountDetails({
            accountDetails,
            setErrors,
        });

        if (!_.size(errors)) onSubmit(accountDetails);
    };

    const handleAddTransactionSource = (data) => {
        const newTransactionSource = _.get(data, "data.transactionSource");
        handleUpdateTransactionSources(newTransactionSource, () => {
            setAccountDetails({
                name: "",
                balance: "0",
                type: "bank-account",
            });
            handleClose();
        });
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
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                            gap: "1rem",
                            mt: 3,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            id="name"
                            name="name"
                            label="Account name"
                            value={accountDetails.name}
                            onChange={handleOnChange}
                            error={Boolean(_.get(errors, "name"))}
                            helperText={_.get(errors, "name")}
                        />

                        <TextField
                            variant="outlined"
                            id="balance"
                            name="balance"
                            label="Account balance"
                            value={accountDetails.balance}
                            onChange={handleOnChange}
                            error={Boolean(_.get(errors, "balance"))}
                            helperText={_.get(errors, "balance")}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Account type
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="type"
                                value={accountDetails.type}
                                label="Account type"
                                onChange={handleOnChange}
                            >
                                <MenuItem value="bank-account">
                                    Bank Account
                                </MenuItem>
                                <MenuItem value="card">Credit Card</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={isLoading || Boolean(_.size(errors))}
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
