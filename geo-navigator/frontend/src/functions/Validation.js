const areValueInRange = function (value, minValue, maxValue) {
  return value >= minValue && value <= maxValue;
};

const isRecommendedValue = function (
  value,
  minRecommendedValue,
  maxRecommendedValue
) {
  return value >= minRecommendedValue && value <= maxRecommendedValue;
};

export { areValueInRange, isRecommendedValue };
