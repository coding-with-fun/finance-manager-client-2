import { Box, Container } from "@mui/material";
import _ from "lodash";
import React, { useContext } from "react";
import { TransactionSourcesContext } from "../../../contexts/TransactionSourcesContext";

const TransactionSourcesList = () => {
    const { transactionSources } = useContext(TransactionSourcesContext);

    return (
        <Container maxWidth="sm">
            {transactionSources.map((sources) => {
                return (
                    <Box key={_.get(sources, "_id")}>
                        {_.get(sources, "name")}
                        {_.get(sources, "type")}
                        {_.get(sources, "balance")}
                    </Box>
                );
            })}
        </Container>
    );
};

export default TransactionSourcesList;
