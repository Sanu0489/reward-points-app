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