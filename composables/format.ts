function formatCurrency(value: number, currency = 'MYR', decimals = 0) {
  if (Number.isNaN(value))
    return '-'

  return new Intl.NumberFormat('en-US', {
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function useFormat() {
  return {
    currency: formatCurrency,
    percentage: (value: number | string) => `${value}%`,
  }
}
