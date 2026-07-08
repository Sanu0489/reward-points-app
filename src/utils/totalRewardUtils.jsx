export const getTotalRewardSummary = (transactions) => {
    const totalRewards = transactions.reduce((accumulator, transaction) => {
        const { customerId, customerName, rewardPoints } = transaction;

        if (!accumulator[customerId]) {
            accumulator[customerId] = {
                customerId,
                customerName,
                rewardPoints: 0,
            };
        }

        accumulator[customerId].rewardPoints += rewardPoints;

        return accumulator;
    }, {});

    return Object.values(totalRewards).sort(
        (a, b) => a.customerId - b.customerId
    );
};