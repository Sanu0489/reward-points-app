import { describe, expect, it } from "vitest";

import { getTotalRewardSummary } from "../../utils/totalRewardUtils";

describe("getTotalRewardSummary", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            rewardPoints: 30,
        },
        {
            id: 3,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            rewardPoints: 150,
        },
        {
            id: 4,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            rewardPoints: 225,
        },
        {
            id: 5,
            customerId: "C003",
            firstName: "Michael",
            lastName: "Brown",
            rewardPoints: 50,
        },
    ];

    it("should return an empty array when transactions are empty", () => {
        expect(getTotalRewardSummary([])).toEqual([]);
    });

    it("should group reward points by customer", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result).toHaveLength(3);
    });

    it("should calculate total reward points correctly for John Smith", () => {
        const result = getTotalRewardSummary(mockTransactions);

        const john = result.find(
            (customer) => customer.customerId === "C001"
        );

        expect(john.rewardPoints).toBe(120);
    });

    it("should calculate total reward points correctly for Alice Johnson", () => {
        const result = getTotalRewardSummary(mockTransactions);

        const alice = result.find(
            (customer) => customer.customerId === "C002"
        );

        expect(alice.rewardPoints).toBe(375);
    });

    it("should preserve customer information", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result[0]).toMatchObject({
            customerId: expect.any(String),
            customerName: expect.any(String),
            rewardPoints: expect.any(Number),
        });
    });

    it("should sort customers by customerId", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result[0].customerId).toBe("C001");
        expect(result[1].customerId).toBe("C002");
        expect(result[2].customerId).toBe("C003");
    });

    it("should return a new array", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result).not.toBe(mockTransactions);
    });

    it("should not mutate the original transactions array", () => {
        const original = structuredClone(mockTransactions);

        getTotalRewardSummary(mockTransactions);

        expect(mockTransactions).toEqual(original);
    });
});