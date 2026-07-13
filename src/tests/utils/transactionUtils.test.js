import { describe, expect, it } from "vitest";

import { mapTransactionsWithRewards } from "../../utils/transactionUtils";

describe("mapTransactionsWithRewards", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            amount: 120,
            product: "Laptop",
            purchaseDate: "2026-06-05",
        },
        {
            id: 2,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            amount: 80,
            product: "Keyboard",
            purchaseDate: "2026-06-10",
        },
        {
            id: 3,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            amount: 40,
            product: "Mouse",
            purchaseDate: "2026-05-15",
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

    it("should create customerName from firstName and lastName", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result[0].customerName).toBe("John Smith");
        expect(result[1].customerName).toBe("John Smith");
        expect(result[2].customerName).toBe("Alice Johnson");
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
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            customerName: "John Smith",
            amount: 120,
            product: "Laptop",
            purchaseDate: "2026-06-05",
        });
    });

    it("should return a new array", () => {
        const result = mapTransactionsWithRewards(mockTransactions);

        expect(result).not.toBe(mockTransactions);
    });
});