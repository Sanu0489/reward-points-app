import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

import { Box } from "@mui/material";

import usePaginationModel from "../../hooks/usePaginationModel";

import { TABLE_HEIGHTS } from "../../constants/tableHeights";

import { monthlyRewardColumns } from "../../constants/tableColumns/monthlyRewardColumns";
import { getDataGridStyles } from "../../styles/dataGridStyles";

/**
 * Displays monthly reward summaries for each customer in a paginated
 * Material UI DataGrid.
 *
 * Supports:
 * - Client-side pagination
 * - Automatic page reset when page size changes
 * - Fixed-height scrollable grid
 * - Built-in DataGrid toolbar
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.monthlyRewards - Monthly reward summary data.
 * @returns {JSX.Element} Monthly rewards table.
 */

const MonthlyRewardTable = ({ monthlyRewards }) => {
  const { paginationModel, handlePaginationModelChange } =
    usePaginationModel(5);

  return (
    <Box
      sx={{
        height: TABLE_HEIGHTS.MONTHLY_REWARDS,
        width: "100%",
      }}
    >
      <DataGrid
        rows={monthlyRewards}
        columns={monthlyRewardColumns}
        getRowId={(row) => `${row.customerId}-${row.monthKey}`}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        density="comfortable"
        disableColumnMenu
        disableColumnResize={false}
        showToolbar
        sx={getDataGridStyles("#F4FBF4", "#1B5E20", "#EEF9EE")}
      />
    </Box>
  );
};

MonthlyRewardTable.propTypes = {
  monthlyRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      monthKey: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MonthlyRewardTable;
