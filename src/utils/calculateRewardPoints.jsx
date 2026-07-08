import {
    REWARD_LIMIT_1,
    REWARD_LIMIT_2,
} from "../constants/rewardConstants";

export const calculateRewardPoints = (amount) => {
    const purchaseAmount = Math.floor(amount);

    if (purchaseAmount <= REWARD_LIMIT_1) {
        return 0;
    }

    if (purchaseAmount <= REWARD_LIMIT_2) {
        return purchaseAmount - REWARD_LIMIT_1;
    }

    return (
        (REWARD_LIMIT_2 - REWARD_LIMIT_1) +
        (purchaseAmount - REWARD_LIMIT_2) * 2
    );
};