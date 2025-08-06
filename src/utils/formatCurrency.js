export function formatCurrency({
  value,
  decimalPlaces = 2,
  thousandSeparator = ',',
  decimalSeparator = '.',
  t,
}) {
  const standardValue = value / 100

  const [integerPart, decimalPart] = standardValue
    .toFixed(decimalPlaces)
    .split('.')

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  )
  if (!decimalPart) return `${formattedIntegerPart} ${t("so'm")}`

  return `${formattedIntegerPart}${decimalSeparator}${decimalPart} ${t("so'm")}`
}
