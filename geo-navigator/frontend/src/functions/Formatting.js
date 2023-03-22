const formatValue = function (value) {
  var valueRev1 = value.replace(",", ".").replace(" ", "").trim();
  while (/[0]/.test(valueRev1.charAt(0)) && /[0-9]/.test(valueRev1.charAt(1))) {
    valueRev1 = valueRev1.slice(1);
  }
  return valueRev1;
};

export { formatValue };
