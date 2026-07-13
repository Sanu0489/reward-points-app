import { Typography } from "@mui/material";

export const totalRewardColumns = [
    {
        field: "customerId",
        headerName: "Customer ID",
        width: 140,
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
        field: "rewardPoints",
        headerName: "Total Reward Points",
        type: "number",
        width: 220,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <Typography
                fontWeight="bold"
                color={
                    params.row.rewardPoints >= 500
                        ? "secondary.main"
                        : "text.primary"
                }
            >
                {params.row.rewardPoints}
            </Typography>
        ),
    },
];