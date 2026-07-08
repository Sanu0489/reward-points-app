import { useMemo } from "react";

import useTransactions from "./useTransactions";

import { mapTransactionsWithRewards } from "../utils/transactionUtils";
import { getMonthlyRewardSummary } from "../utils/monthlyRewardUtils";
import { getTotalRewardSummary } from "../utils/totalRewardUtils";
import { getDashboardStats } from "../utils/dashboardUtils";

const useRewardDashboard = () => {
    const {
        transactions,
        loading,
        error,
    } = useTransactions();

    const transactionsWithRewards = useMemo(
        () => mapTransactionsWithRewards(transactions),
        [transactions]
    );

    const monthlyRewards = useMemo(
        () => getMonthlyRewardSummary(transactionsWithRewards),
        [transactionsWithRewards]
    );

    const totalRewards = useMemo(
        () => getTotalRewardSummary(transactionsWithRewards),
        [transactionsWithRewards]
    );

    const dashboardStats = useMemo(
        () => getDashboardStats(transactionsWithRewards),
        [transactionsWithRewards]
    );

    return {
        loading,
        error,
        transactionsWithRewards,
        monthlyRewards,
        totalRewards,
        dashboardStats,
    };
};

export default useRewardDashboard;