export const calculateRewardPoints = (amount) => {
  if (typeof amount !== "number" || amount <= 50) return 0;

  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2;
    points += 50;
  } else {
    points += amount - 50;
  }

  return Math.floor(points);
};