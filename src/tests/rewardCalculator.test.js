import { calculateRewardPoints } from "../utils/rewardCalculator";

test("120 should return 90 points", () => {
  expect(calculateRewardPoints(120)).toBe(90);
});

test("100 should return 50 points", () => {
  expect(calculateRewardPoints(100)).toBe(50);
});

test("75 should return 25 points", () => {
  expect(calculateRewardPoints(75)).toBe(25);
});

test("Below 50 returns 0", () => {
  expect(calculateRewardPoints(30)).toBe(0);
});

test("Invalid input returns 0", () => {
  expect(calculateRewardPoints("abc")).toBe(0);
});

test("Decimal amount 120.25 returns 90", () => {
  expect(calculateRewardPoints(120.25)).toBe(90);
});
