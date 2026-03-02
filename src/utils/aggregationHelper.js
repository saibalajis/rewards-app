import { calculateRewardPoints } from "./rewardCalculator";

export const groupByCustomer = (transactions) => {
  const result = {};

  transactions.forEach((txn) => {
    const month = new Date(txn.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const points = calculateRewardPoints(txn.amount);

    if (!result[txn.customerId]) {
      result[txn.customerId] = {
        monthly: {},
        totalAmount: 0,
        totalPoints: 0,
      };
    }

    if (!result[txn.customerId].monthly[month]) {
      result[txn.customerId].monthly[month] = {
        transactions: [],
        totalAmount: 0,
        totalPoints: 0,
      };
    }

    result[txn.customerId].monthly[month].transactions.push({
      ...txn,
      points,
    });

    result[txn.customerId].monthly[month].totalAmount += txn.amount;
    result[txn.customerId].monthly[month].totalPoints += points;

    result[txn.customerId].totalAmount += txn.amount;
    result[txn.customerId].totalPoints += points;
  });

  return result;
};