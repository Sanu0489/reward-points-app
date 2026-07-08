import { Box, Container, Paper, Typography } from "@mui/material";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardCards from "../components/dashboard/DashboardCards";

import TransactionTable from "../components/transactions/TransactionTable";

import MonthlyRewardTable from "../components/rewards/MonthlyRewardTable";
import TotalRewardTable from "../components/rewards/TotalRewardTable";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

import useRewardDashboard from "../hooks/useRewardDashboard";

const Dashboard = () => {
    const {
        loading,
        error,
        transactionsWithRewards,
        monthlyRewards,
        totalRewards,
        dashboardStats,
    } = useRewardDashboard();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!transactionsWithRewards.length) {
        return (
            <EmptyState
                title="No Transactions Found"
                description="No transactions are available."
            />
        );
    }

    return (
        <Container maxWidth="xl">
            <Box py={4}>
                <DashboardHeader />

                <DashboardCards
                    totalCustomers={dashboardStats.totalCustomers}
                    totalTransactions={dashboardStats.totalTransactions}
                    totalRewardPoints={dashboardStats.totalRewardPoints}
                />

                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Transactions
                    </Typography>

                    <TransactionTable
                        transactions={transactionsWithRewards}
                    />
                </Paper>

                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        User Monthly Rewards
                    </Typography>

                    <MonthlyRewardTable
                        monthlyRewards={monthlyRewards}
                    />
                </Paper>

                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        User Total Rewards
                    </Typography>

                    <TotalRewardTable
                        totalRewards={totalRewards}
                    />
                </Paper>
            </Box>
        </Container>
    );
};

export default Dashboard;