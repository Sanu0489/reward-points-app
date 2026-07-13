import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";

import { Box } from "@mui/material";

import usePaginationModel from "../../hooks/usePaginationModel";

import { TABLE_HEIGHTS } from "../../constants/tableHeights";

import { transactionColumns } from "../../constants/tableColumns/transactionColumns";
import { getDataGridStyles } from "../../styles/dataGridStyles";

/**
 * Displays customer transactions in a paginated Material UI DataGrid.
 *
 * Supports:
 * - Client-side pagination
 * - Automatic page reset when page size changes
 * - Sorting and toolbar support
 * - Fixed-height scrollable grid
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.transactions - List of transactions to display.
 * @returns {JSX.Element} Transaction table.
 */

const TransactionTable = ({ transactions }) => {
    const {
        paginationModel,
        handlePaginationModelChange,
    } = usePaginationModel(10);

    return (
        <Box
        sx={{
            height: TABLE_HEIGHTS.TRANSACTIONS,
            width: "100%",
        }}
    >
        <DataGrid
            rows={transactions}
            columns={transactionColumns}
            getRowId={(row) => row.id}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10, 20]}
            rowHeight={56}
            columnHeaderHeight={56}
            disableRowSelectionOnClick
            density="comfortable"
            disableColumnMenu
            disableColumnResize={false}
            showToolbar
            sx={getDataGridStyles(
                "#F5F9FF",
                "#0D47A1",
                "#EAF4FF"
            )}
        />
    </Box>
    );
};

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            customerId: PropTypes.string.isRequired,
            customerName: PropTypes.string.isRequired,
            purchaseDate: PropTypes.string.isRequired,
            product: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            rewardPoints: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default TransactionTable;