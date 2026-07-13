import { lazy, Suspense, useState } from "react";

import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardCards from "../components/dashboard/DashboardCards";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

import useRewardDashboard from "../hooks/useRewardDashboard";

// Lazy-loaded dashboard tables for improved initial page load.
const TransactionTable = lazy(
  () => import("../components/transactions/TransactionTable"),
);

const MonthlyRewardTable = lazy(
  () => import("../components/rewards/MonthlyRewardTable"),
);

const TotalRewardTable = lazy(
  () => import("../components/rewards/TotalRewardTable"),
);

/**
 * Reward Points Dashboard page.
 *
 * Displays a summary of customer reward data, including:
 * - Dashboard summary cards
 * - Transaction history
 * - Monthly reward summaries
 * - Total reward summaries
 *
 * The page handles loading, error, and empty states before rendering
 * the dashboard content. Data is fetched through the useRewardDashboard
 * custom hook, and the tables are lazy loaded to improve the initial
 * application load time.
 *
 * @returns {JSX.Element} Reward Points Dashboard page.
 */
const Dashboard = () => {
  const {
    loading,
    error,
    refetch,
    transactionsWithRewards,
    monthlyRewards,
    totalRewards,
    dashboardStats,
  } = useRewardDashboard();

  const [selectedTab, setSelectedTab] = useState(0);

  /**
   * Updates the selected dashboard tab.
   *
   * @param {React.SyntheticEvent} _event - Tab change event.
   * @param {number} newValue - Selected tab index.
   */
  const handleTabChange = (_event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }

  if (!loading && transactionsWithRewards.length === 0) {
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

        <Paper elevation={3} sx={{ mt: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "#fafafa",
            }}
          >
            <Tab label="Transactions" />
            <Tab label="Monthly Rewards" />
            <Tab label="Total Rewards" />
          </Tabs>

          <Box p={3}>
            <Suspense fallback={<Loader />}>
              {selectedTab === 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Transactions
                  </Typography>

                  <TransactionTable transactions={transactionsWithRewards} />
                </>
              )}

              {selectedTab === 1 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    User Monthly Rewards
                  </Typography>

                  <MonthlyRewardTable monthlyRewards={monthlyRewards} />
                </>
              )}

              {selectedTab === 2 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    User Total Rewards
                  </Typography>

                  <TotalRewardTable totalRewards={totalRewards} />
                </>
              )}
            </Suspense>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
