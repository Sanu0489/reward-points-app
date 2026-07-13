import { calculateRewardPoints } from "./calculateRewardPoints";

/**
 * Maps transactions by enriching them with calculated reward points
 * and a formatted customer name.
 *
 * The original transaction objects are not mutated. A new array of
 * transactions is returned with the additional derived properties.
 *
 * @param {Array<Object>} transactions - Raw transaction data.
 * @returns {Array<Object>} Transactions enriched with customerName and rewardPoints.
 */

export const mapTransactionsWithRewards = (transactions) => {
    return transactions.map((transaction) => ({
        ...transaction,
        customerName: `${transaction.firstName} ${transaction.lastName}`,
        rewardPoints: calculateRewardPoints(transaction.amount),
    }));
};