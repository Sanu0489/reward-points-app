import { describe, it, expect } from "vitest";

import { getMonthlyRewardSummary } from "../../utils/monthlyRewardUtils";

describe("getMonthlyRewardSummary", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            purchaseDate: "2024-01-05",
            amount: 120,
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: 101,
            customerName: "John Smith",
            purchaseDate: "2024-01-18",
            amount: 45,
            rewardPoints: 0,
        },
        {
            id: 3,
            customerId: 101,
            customerName: "John Smith",
            purchaseDate: "2024-02-02",
            amount: 80,
            rewardPoints: 30,
        },
        {
            id: 4,
            customerId: 102,
            customerName: "Alice Johnson",
            purchaseDate: "2024-01-10",
            amount: 150,
            rewardPoints: 150,
        },
        {
            id: 5,
            customerId: 102,
            customerName: "Alice Johnson",
            purchaseDate: "2024-01-20",
            amount: 175,
            rewardPoints: 225,
        },
    ];

    it("should return an empty array when transactions are empty", () => {
        expect(getMonthlyRewardSummary([])).toEqual([]);
    });

    it("should group transactions by customer and month", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result).toHaveLength(3);
    });

    it("should calculate monthly reward points correctly", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        const johnJan = result.find(
            (item) =>
                item.customerId === 101 &&
                item.month === "Jan"
        );

        expect(johnJan.rewardPoints).toBe(90);
    });

    it("should calculate monthly purchase amount correctly", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        const johnJan = result.find(
            (item) =>
                item.customerId === 101 &&
                item.month === "Jan"
        );

        expect(johnJan.totalAmount).toBe(165);
    });

    it("should calculate total transactions correctly", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        const johnJan = result.find(
            (item) =>
                item.customerId === 101 &&
                item.month === "Jan"
        );

        expect(johnJan.totalTransactions).toBe(2);
    });

    it("should include month and year", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result[0]).toHaveProperty("month");
        expect(result[0]).toHaveProperty("year");
        expect(result[0]).toHaveProperty("monthYear");
    });

    it("should sort by customer name", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result[0].customerName).toBe("Alice Johnson");
        expect(result[1].customerName).toBe("John Smith");
    });

    it("should preserve customer information", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result[0]).toMatchObject({
            customerId: expect.any(Number),
            customerName: expect.any(String),
        });
    });
});