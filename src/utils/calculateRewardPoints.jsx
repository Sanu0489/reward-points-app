import {
    REWARD_LOWER_THRESHOLD,
    REWARD_UPPER_THRESHOLD,
} from "../constants/rewardConstants";

/**
 * Calculates reward points for a purchase amount.
 *
 * Reward rules:
 * - No points for purchases up to the lower threshold.
 * - One point for every dollar spent between the lower and upper thresholds.
 * - Two points for every dollar spent above the upper threshold.
 *
 * Decimal purchase amounts are rounded down to the nearest whole dollar
 * before calculating reward points.
 *
 * @param {number} amount - Purchase amount in dollars.
 * @returns {number} Total reward points earned.
 * @throws {Error} Throws an error if the purchase amount is null, undefined, NaN, non-numeric, or negative.
 */

export const calculateRewardPoints = (amount) => {
    if (
        amount == null ||
        Number.isNaN(amount) ||
        typeof amount !== "number" ||
        amount < 0
    ) {
        throw new Error("Invalid purchase amount.");
    }
    const purchaseAmount = Math.floor(amount);

    if (purchaseAmount <= REWARD_LOWER_THRESHOLD) {
        return 0;
    }

    if (purchaseAmount <= REWARD_UPPER_THRESHOLD) {
        return purchaseAmount - REWARD_LOWER_THRESHOLD;
    }

    return (
        (REWARD_UPPER_THRESHOLD - REWARD_LOWER_THRESHOLD) +
        (purchaseAmount - REWARD_UPPER_THRESHOLD) * 2
    );
};