/**
 * Fetches transaction data from the local JSON file.
 *
 * Validates the response before returning the transaction list.
 *
 * @param {AbortSignal} signal - Abort signal used to cancel the request.
 * @returns {Promise<Array<Object>>} A promise that resolves to the list of transactions.
 * @throws {Error} Throws an error if the request fails or the response format is invalid.
 */
export const getTransactions = async (signal) => {
    const response = await fetch("/db.json", {
        signal,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
    }

    const data = await response.json();

    if (
        !data ||
        typeof data !== "object" ||
        !Array.isArray(data.transactions)
    ) {
        throw new Error("Invalid transactions response.");
    }

    return data.transactions;
};