import dayjs from "dayjs";

/**
 * Generates monthly reward summaries for each customer.
 *
 * Transactions are grouped by customer and purchase month, and the
 * following metrics are calculated for each month:
 * - Total reward points
 * - Total purchase amount
 * - Total number of transactions
 *
 * Only the latest three months of data are returned. The result is
 * sorted alphabetically by customer name and, for each customer,
 * from the most recent month to the oldest month.
 *
 * @param {Array<Object>} transactions - List of transactions with reward points.
 * @returns {Array<Object>} Monthly reward summaries.
 */

export const getMonthlyRewardSummary = (transactions) => {
    const monthlyRewardMap = new Map();

    transactions.forEach((transaction) => {
        const monthKey = dayjs(transaction.purchaseDate).format("YYYY-MM");

        const key = `${transaction.customerId}-${monthKey}`;

        if (!monthlyRewardMap.has(key)) {
            monthlyRewardMap.set(key, {
                customerId: transaction.customerId,
                customerName: `${transaction.firstName} ${transaction.lastName}`,
                monthKey,
                rewardPoints: 0,
                totalAmount: 0,
                totalTransactions: 0,
            });
        }

        const reward = monthlyRewardMap.get(key);

        reward.rewardPoints += transaction.rewardPoints;
        reward.totalAmount += transaction.amount;
        reward.totalTransactions += 1;
    });

    const rewards = [...monthlyRewardMap.values()];

    const latestThreeMonths = [...new Set(rewards.map((reward) => reward.monthKey))]
        .sort((a, b) => b.localeCompare(a))
        .slice(0, 3);   

    return rewards
        .filter((reward) => latestThreeMonths.includes(reward.monthKey))
        .sort((a, b) => {
            if (a.customerName !== b.customerName) {
                return a.customerName.localeCompare(b.customerName);
            }

            return b.monthKey.localeCompare(a.monthKey);
        });
};