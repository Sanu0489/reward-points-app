import { describe, expect, it } from "vitest";

import { getMonthlyRewardSummary } from "../../utils/monthlyRewardUtils";

describe("getMonthlyRewardSummary", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            purchaseDate: "2026-06-05",
            amount: 120,
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            purchaseDate: "2026-06-18",
            amount: 45,
            rewardPoints: 0,
        },
        {
            id: 3,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            purchaseDate: "2026-05-02",
            amount: 80,
            rewardPoints: 30,
        },
        {
            id: 4,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            purchaseDate: "2026-06-10",
            amount: 150,
            rewardPoints: 150,
        },
        {
            id: 5,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            purchaseDate: "2026-06-20",
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

        const johnJune = result.find(
            (item) =>
                item.customerId === "C001" &&
                item.monthKey === "2026-06"
        );

        expect(johnJune.rewardPoints).toBe(90);
    });

    it("should calculate monthly purchase amount correctly", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        const johnJune = result.find(
            (item) =>
                item.customerId === "C001" &&
                item.monthKey === "2026-06"
        );

        expect(johnJune.totalAmount).toBe(165);
    });

    it("should calculate total transactions correctly", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        const johnJune = result.find(
            (item) =>
                item.customerId === "C001" &&
                item.monthKey === "2026-06"
        );

        expect(johnJune.totalTransactions).toBe(2);
    });

    it("should include monthKey", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result[0]).toHaveProperty("monthKey");
    });

    it("should sort by customer name", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result[0].customerName).toBe("Alice Johnson");
        expect(result[1].customerName).toBe("John Smith");
    });

    it("should preserve customer information", () => {
        const result = getMonthlyRewardSummary(mockTransactions);

        expect(result[0]).toMatchObject({
            customerId: expect.any(String),
            customerName: expect.any(String),
        });
    });
});