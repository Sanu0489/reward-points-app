/**
 * Generates total reward points for each customer.
 *
 * @param {Array} transactions - List of transactions.
 * @returns {Array} Total rewards grouped by customer.
 */
export const getTotalRewardSummary = (transactions) => {
    const rewardMap = new Map();

    transactions.forEach((transaction) => {
        const {
            customerId,
            firstName,
            lastName,
            rewardPoints,
        } = transaction;

        if (!rewardMap.has(customerId)) {
            rewardMap.set(customerId, {
                customerId,
                customerName: `${firstName} ${lastName}`,
                rewardPoints: 0,
            });
        }

        rewardMap.get(customerId).rewardPoints += rewardPoints;
    });

    return [...rewardMap.values()].sort((a, b) =>
        a.customerId.localeCompare(b.customerId)
    );
};