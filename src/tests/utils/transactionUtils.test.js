import { describe, it, expect } from "vitest";

import { mapTransactionsWithRewards } from "../../utils/transactionUtils";

describe("mapTransactionsWithRewards", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            amount: 120,
            product: "Laptop",
            purchaseDate: "2024-01-05",
        },
        {
            id: 2,
            customerId: 101,
            customerName: "John Smith",
            amount: 80,
            product: "Keyboard",
            purchaseDate: "2024-01-10",
        },
        {
            id: 3,
            customerId: 102,
            customerName: "Alice Johnson",
            amount: 40,
            product: "Mouse",
            purchaseDate: "2024-01-15",
        },
    ];

    it("should add rewardPoints property to every transaction", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result[0]).toHaveProperty("rewardPoints");
        expect(result[1]).toHaveProperty("rewardPoints");
        expect(result[2]).toHaveProperty("rewardPoints");
    });

    it("should calculate reward points correctly", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result[0].rewardPoints).toBe(90);
        expect(result[1].rewardPoints).toBe(30);
        expect(result[2].rewardPoints).toBe(0);
    });

    it("should return the same number of transactions", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result).toHaveLength(mockTransactions.length);
    });

    it("should not mutate the original array", () => {
        const original = structuredClone(mockTransactions);

        mapTransactionsWithRewards(mockTransactions);

        expect(mockTransactions).toEqual(original);
    });

    it("should return an empty array when input is empty", () => {
        expect(mapTransactionsWithRewards([])).toEqual([]);
    });

    it("should preserve all original transaction properties", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result[0]).toMatchObject({
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            amount: 120,
            product: "Laptop",
            purchaseDate: "2024-01-05",
        });
    });

    it("should return a new array", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result).not.toBe(mockTransactions);
    });
});