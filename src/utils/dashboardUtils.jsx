/**
 * Calculates summary statistics for the dashboard.
 *
 * @param {Array<Object>} transactions - Transactions with reward points.
 * @returns {{
 *   totalCustomers: number,
 *   totalTransactions: number,
 *   totalRewardPoints: number
 * }}
 */
export const getDashboardStats = (transactions) => {
    return {
        totalCustomers: new Set(
            transactions.map((transaction) => transaction.customerId)
        ).size,

        totalTransactions: transactions.length,

        totalRewardPoints: transactions.reduce(
            (total, transaction) => total + transaction.rewardPoints,
            0
        ),
    };
};