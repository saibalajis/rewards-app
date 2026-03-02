/**
 * logger utility - can be replaced with approved libraries
 */

export const logger = {
    info: (message, data = "") => {
        console.info(`[INFO]: ${message}`, data);
    },
    error: (message, error = "") => {
        console.error(`[ERROr]: ${message}`, error);
    }
};