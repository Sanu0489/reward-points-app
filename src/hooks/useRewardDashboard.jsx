import { useMemo } from "react";

import useTransactions from "./useTransactions";

import { mapTransactionsWithRewards } from "../utils/transactionUtils";
import { getMonthlyRewardSummary } from "../utils/monthlyRewardUtils";
import { getTotalRewardSummary } from "../utils/totalRewardUtils";
import { getDashboardStats } from "../utils/dashboardUtils";

/**
 * Builds all data required by the Reward Dashboard.
 *
 * Fetches transactions using the useTransactions hook and derives:
 * - Transactions with calculated reward points
 * - Monthly reward summaries
 * - Total reward summaries
 * - Dashboard statistics
 *
 * Memoization is used to avoid unnecessary recalculations when the
 * underlying transaction data has not changed.
 *
 * @returns {{
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: Function,
 *   transactionsWithRewards: Array<Object>,
 *   monthlyRewards: Array<Object>,
 *   totalRewards: Array<Object>,
 *   dashboardStats: {
 *     totalCustomers: number,
 *     totalTransactions: number,
 *     totalRewardPoints: number
 *   }
 * }}
 */

const useRewardDashboard = () => {
  const { transactions, loading, error, refetch } = useTransactions();

  const transactionsWithRewards = useMemo(
    () => mapTransactionsWithRewards(transactions),
    [transactions],
  );

  const monthlyRewards = useMemo(
    () => getMonthlyRewardSummary(transactionsWithRewards),
    [transactionsWithRewards],
  );

  const totalRewards = useMemo(
    () => getTotalRewardSummary(transactionsWithRewards),
    [transactionsWithRewards],
  );

  const dashboardStats = useMemo(
    () => getDashboardStats(transactionsWithRewards),
    [transactionsWithRewards],
  );

  console.log({
    transactions: transactions.length,
    transactionsWithRewards: transactionsWithRewards.length,
  });

  return {
    loading,
    error,
    refetch,
    transactionsWithRewards,
    monthlyRewards,
    totalRewards,
    dashboardStats,
  };
};

export default useRewardDashboard;
