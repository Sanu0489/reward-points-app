import { describe, it, expect } from "vitest";

import { getTotalRewardSummary } from "../../utils/totalRewardUtils";

describe("getTotalRewardSummary", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: 101,
            customerName: "John Smith",
            rewardPoints: 30,
        },
        {
            id: 3,
            customerId: 102,
            customerName: "Alice Johnson",
            rewardPoints: 150,
        },
        {
            id: 4,
            customerId: 102,
            customerName: "Alice Johnson",
            rewardPoints: 225,
        },
        {
            id: 5,
            customerId: 103,
            customerName: "Michael Brown",
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
            (customer) => customer.customerId === 101
        );

        expect(john.rewardPoints).toBe(120);
    });

    it("should calculate total reward points correctly for Alice Johnson", () => {
        const result = getTotalRewardSummary(mockTransactions);

        const alice = result.find(
            (customer) => customer.customerId === 102
        );

        expect(alice.rewardPoints).toBe(375);
    });

    it("should preserve customer information", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result[0]).toMatchObject({
            customerId: expect.any(Number),
            customerName: expect.any(String),
            rewardPoints: expect.any(Number),
        });
    });

    it("should sort customers by customerId", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result[0].customerId).toBe(101);
        expect(result[1].customerId).toBe(102);
        expect(result[2].customerId).toBe(103);
    });

    it("should return a new array", () => {
        const result = getTotalRewardSummary(mockTransactions);

        expect(result).not.toBe(mockTransactions);
    });

    it("should not mutate the original transactions array", () => {
        const original = JSON.parse(JSON.stringify(mockTransactions));

        getTotalRewardSummary(mockTransactions);

        expect(mockTransactions).toEqual(original);
    });
});