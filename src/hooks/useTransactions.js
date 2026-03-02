import { useState, useEffect } from "react";
 
import { fetchTransactions } from "../services/transactionService";
import { ERROR_MESSAGES } from "../utils/constants";
import { logger } from "../utils/logger";
 
/**
 * custom hooks to fetch and aggregrate transactions.
 */
export const useTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        logger.info("fetching transactions...");
        const res = await fetchTransactions();
        setData(res);
      } catch (err) {
        logger.error("Transaction failed", err);
        setError(err?.message || ERROR_MESSAGES.API_ERROR);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
 
  return { data, loading, error };
};