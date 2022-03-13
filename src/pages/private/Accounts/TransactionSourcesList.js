import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { TransactionSourcesContext } from "../../../contexts/TransactionSourcesContext";

const TransactionSourcesList = () => {
    const {
        transactionSources,
        transactionSourcesPaginationDetails,
        handleSetTransactionSourcesPaginationDetails,
    } = useContext(TransactionSourcesContext);

    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "type", headerName: "Account Type", flex: 0.9 },
        {
            field: "balance",
            headerName: "Balance",
            width: 150,
            valueFormatter: (params) => {
                const valueFormatted = Number(params.value).toLocaleString(
                    "en-IN",
                    {
                        maximumFractionDigits: 2,
                    }
                );
                return `${valueFormatted} INR`;
            },
        },
    ];

    return (
        <Box
            sx={{
                height: "42.6rem",
                mt: "2rem",
            }}
        >
            <DataGrid
                autoHeight
                pagination
                pageSize={transactionSourcesPaginationDetails.perPage}
                rowsPerPageOptions={[1, 2, 5, 10, 20]}
                onPageSizeChange={(newPageSize) =>
                    handleSetTransactionSourcesPaginationDetails({
                        perPage: newPageSize,
                    })
                }
                rows={transactionSources}
                columns={columns}
                getRowId={(row) => row._id}
            />
        </Box>
    );
};

export default TransactionSourcesList;
