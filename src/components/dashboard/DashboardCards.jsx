import PropTypes from "prop-types";
import { memo } from "react";

import { Grid } from "@mui/material";

import SummaryCard from "./SummaryCard";

/**
 * Displays summary cards for the Reward Points Dashboard.
 *
 * Renders the key dashboard metrics:
 * - Total customers
 * - Total transactions
 * - Total reward points
 *
 * @param {Object} props - Component props.
 * @param {number} props.totalCustomers - Total number of unique customers.
 * @param {number} props.totalTransactions - Total number of transactions.
 * @param {number} props.totalRewardPoints - Total reward points earned.
 * @returns {JSX.Element} Dashboard summary cards.
 */
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

export default memo(DashboardCards);