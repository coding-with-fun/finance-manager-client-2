import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import _ from "lodash";
import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "react-query";
import { FetchTransactionSources_API } from "../../../api/TransactionSource.api";
import { TransactionSourcesContext } from "../../../contexts/TransactionSourcesContext";
import NewAccountModal from "./NewAccountModal";
import TransactionSourcesList from "./TransactionSourcesList";

const Accounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        handleSetTransactionSources,
        handleSetTransactionSourcesPaginationDetails,
    } = useContext(TransactionSourcesContext);

    const handleToggleModal = () => {
        setIsModalOpen((prevFlag) => {
            return !prevFlag;
        });
    };

    useQuery("fetch-transaction-sources", FetchTransactionSources_API, {
        onSuccess: (data) => {
            const {
                pageNumber,
                perPage,
                sortField,
                sortType,
                transactionSources,
            } = _.get(data, "data");
            handleSetTransactionSources(transactionSources);
            handleSetTransactionSourcesPaginationDetails({
                pageNumber,
                perPage,
                sortField,
                sortType,
            });
        },
    });

    return (
        <Fragment>
            <NewAccountModal
                open={isModalOpen}
                handleClose={handleToggleModal}
            />

            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        pt: 3,
                    }}
                >
                    <Typography
                        component="div"
                        variant="h4"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        Accounts
                    </Typography>

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleToggleModal}
                    >
                        Add new account
                    </Button>
                </Box>

                <TransactionSourcesList />
            </Container>
        </Fragment>
    );
};

export default Accounts;
