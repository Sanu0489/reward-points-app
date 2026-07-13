import { Typography } from "@mui/material";

import dayjs from "dayjs";

export const monthlyRewardColumns = [
  {
    field: "customerId",
    headerName: "Customer ID",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    minWidth: 220,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "monthKey",
    headerName: "Month",
    width: 140,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value) => dayjs(value).format("MMM YYYY"),
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    type: "number",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Typography
        fontWeight="bold"
        color={params.row.rewardPoints >= 100 ? "success.main" : "text.primary"}
      >
        {params.row.rewardPoints}
      </Typography>
    ),
  },
];
