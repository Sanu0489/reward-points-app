import { calculateRewardPoints } from "./calculateRewardPoints";

export const mapTransactionsWithRewards = (transactions) => {
    return transactions.map((transaction) => ({
        ...transaction,
        rewardPoints: calculateRewardPoints(transaction.amount),
    }));
};