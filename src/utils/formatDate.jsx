/**
 * Formats a date into a human-readable US locale string.
 *
 * Example:
 * "2026-06-05" → "Jun 5, 2026"
 *
 * @param {string | Date} date - Date value to format.
 * @returns {string} Formatted date string.
 */

export const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));