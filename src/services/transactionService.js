import { mockTransactions } from "../common/mockTransactions";
import { logger } from "../utils/logger";
 
/**
 * Simulated API call
 * this can be replaced with real API call
 */
export const fetchTransactions = async () => {
  logger.info("Calling Service");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Toggle this to simulate API failure
        const shouldFail = false;
        if(shouldFail) {
          throw new Error("simulated API failure");
        }
      resolve(mockTransactions);
    } catch (err) {
      logger.error("Transaction service error", err);
      reject(err);
    }
    }, 1500);
  });
};
 