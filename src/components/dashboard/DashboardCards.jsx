import PropTypes from "prop-types";

import { Grid } from "@mui/material";

import SummaryCard from "./SummaryCard";

const DashboardCards = ({
    totalCustomers,
    totalTransactions,
    totalRewardPoints,
}) => {
    return (
        <Grid container spacing={3} mb={4}>
            <Grid size={{ xs: 12, md: 4 }}>
                <SummaryCard
                    title="Total Customers"
                    value={totalCustomers}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <SummaryCard
                    title="Total Transactions"
                    value={totalTransactions}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <SummaryCard
                    title="Total Reward Points"
                    value={totalRewardPoints}
                />
            </Grid>
        </Grid>
    );
};

DashboardCards.propTypes = {
    totalCustomers: PropTypes.number.isRequired,
    totalTransactions: PropTypes.number.isRequired,
    totalRewardPoints: PropTypes.number.isRequired,
};

export default DashboardCards;