export const getMonthlyRewardSummary = (transactions) => {
    const monthlyRewards = transactions.reduce((accumulator, transaction) => {
        const date = new Date(transaction.purchaseDate);

        const month = date.toLocaleString("default", {
            month: "short",
        });

        const year = date.getFullYear();

        const monthYear = `${month} ${year}`;

        const key = `${transaction.customerId}-${monthYear}`;

        if (!accumulator[key]) {
            accumulator[key] = {
                customerId: transaction.customerId,
                customerName: transaction.customerName,
                month,
                year,
                monthYear,
                rewardPoints: 0,
                totalAmount: 0,
                totalTransactions: 0,
            };
        }

        accumulator[key].rewardPoints += transaction.rewardPoints;
        accumulator[key].totalAmount += transaction.amount;
        accumulator[key].totalTransactions += 1;

        return accumulator;
    }, {});

    return Object.values(monthlyRewards).sort((a, b) => {
        if (a.customerName !== b.customerName) {
            return a.customerName.localeCompare(b.customerName);
        }

        return a.year - b.year || a.month.localeCompare(b.month);
    });
};