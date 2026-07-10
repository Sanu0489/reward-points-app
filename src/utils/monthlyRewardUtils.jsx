import dayjs from "dayjs";

export const getMonthlyRewardSummary = (transactions) => {
    const monthlyRewardMap = new Map();

    transactions.forEach((transaction) => {
        const monthKey = dayjs(transaction.purchaseDate).format("YYYY-MM");

        const key = `${transaction.customerId}-${monthKey}`;

        if (!monthlyRewardMap.has(key)) {
            monthlyRewardMap.set(key, {
                customerId: transaction.customerId,
                customerName: transaction.customerName,
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

    console.log([...monthlyRewardMap.values()]);    

    return rewards
        .filter((reward) => latestThreeMonths.includes(reward.monthKey))
        .sort((a, b) => {
            if (a.customerName !== b.customerName) {
                return a.customerName.localeCompare(b.customerName);
            }

            return b.monthKey.localeCompare(a.monthKey);
        });
};