import { describe, expect, it } from "vitest";

import { calculateRewardPoints } from "../../utils/calculateRewardPoints";

describe("calculateRewardPoints", () => {
    it("should return 0 for amount less than lower threshold", () => {
        expect(calculateRewardPoints(40)).toBe(0);
    });

    it("should return 0 for amount exactly 50", () => {
        expect(calculateRewardPoints(50)).toBe(0);
    });

    it("should return 1 point for amount 51", () => {
        expect(calculateRewardPoints(51)).toBe(1);
    });

    it("should return 25 points for amount 75", () => {
        expect(calculateRewardPoints(75)).toBe(25);
    });

    it("should return 50 points for amount exactly 100", () => {
        expect(calculateRewardPoints(100)).toBe(50);
    });

    it("should return 52 points for amount 101", () => {
        expect(calculateRewardPoints(101)).toBe(52);
    });

    it("should return 90 points for amount 120", () => {
        expect(calculateRewardPoints(120)).toBe(90);
    });

    it("should return 150 points for amount 150", () => {
        expect(calculateRewardPoints(150)).toBe(150);
    });

    it("should return 250 points for amount 200", () => {
        expect(calculateRewardPoints(200)).toBe(250);
    });

    it("should return 0 for amount 0", () => {
        expect(calculateRewardPoints(0)).toBe(0);
    });

    it("should correctly calculate decimal amount", () => {
        expect(calculateRewardPoints(120.75)).toBe(90);
    });

    it("should throw an error for negative amount", () => {
        expect(() =>
            calculateRewardPoints(-100)
        ).toThrow("Invalid purchase amount.");
    });

    it("should throw an error for null amount", () => {
        expect(() =>
            calculateRewardPoints(null)
        ).toThrow("Invalid purchase amount.");
    });

    it("should throw an error for undefined amount", () => {
        expect(() =>
            calculateRewardPoints(undefined)
        ).toThrow("Invalid purchase amount.");
    });

    it("should throw an error for NaN amount", () => {
        expect(() =>
            calculateRewardPoints(Number.NaN)
        ).toThrow("Invalid purchase amount.");
    });
});