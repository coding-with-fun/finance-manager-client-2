import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import NewAccountModal from "./NewAccountModal";
import TransactionSourcesList from "./TransactionSourcesList";

const Accounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen((prevFlag) => {
            return !prevFlag;
        });
    };

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
