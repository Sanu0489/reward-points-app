import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";

import { Box } from "@mui/material";

import usePaginationModel from "../../hooks/usePaginationModel";

import { TABLE_HEIGHTS } from "../../constants/tableHeights";

import { totalRewardColumns } from "../../constants/tableColumns/totalRewardColumns";
import { getDataGridStyles } from "../../styles/dataGridStyles";

/**
 * Displays total reward points earned by each customer in a paginated
 * Material UI DataGrid.
 *
 * Supports:
 * - Client-side pagination
 * - Automatic page reset when page size changes
 * - Fixed-height scrollable grid
 * - Built-in DataGrid toolbar
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.totalRewards - Total reward summary for each customer.
 * @returns {JSX.Element} Total rewards table.
 */

const TotalRewardTable = ({ totalRewards }) => {
  const { paginationModel, handlePaginationModelChange } =
    usePaginationModel(5);

  return (
    <Box
      sx={{
        height: TABLE_HEIGHTS.TOTAL_REWARDS,
        width: "100%",
      }}
    >
      <DataGrid
        rows={totalRewards}
        columns={totalRewardColumns}
        getRowId={(row) => row.customerId}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[3, 5, 10]}
        disableRowSelectionOnClick
        density="comfortable"
        disableColumnMenu
        disableColumnResize={false}
        showToolbar
        sx={getDataGridStyles("#FBF5FC", "#4A148C", "#FCF7FD")}
      />
    </Box>
  );
};

TotalRewardTable.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TotalRewardTable;
